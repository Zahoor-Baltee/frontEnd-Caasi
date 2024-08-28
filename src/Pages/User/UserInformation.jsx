import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Typography, Grid, TextField, IconButton, Menu } from '@mui/material';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

import image from '../../Assets/man.png';
import expenseReportIcon from '../../Assets/Icon.png';
import activityReport from '../../Assets/activityReport.png';
import userAbsense from '../../Assets/userAbsence.png';
import { useLocation } from 'react-router-dom';
import { UserServices } from '../../Services/User/UserServices';
import { Helpers } from '../../Shell/Helper';
import AuthService from '../../Services/AuthServices';
import AlertSnackbar from '../../Componenets/AlertSnackbar';
import { DataGrid } from '@mui/x-data-grid';
import CustomNoRowsOverlay from '../../Componenets/NoDataFound';
import { Visibility } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ExpenseService } from '../../Services/Expense/ExpenseService';


const Root = styled(Box)(({ theme }) => ({
    margin: 0,
    padding: 0,
    "& .mainContainer": {
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        backgroundColor: "#f4f7fe",
        "& .MuiDataGrid-topContainer ": {
            backgroundColor: "#2f80ed !important"
        },
        "& .MuiDataGrid-virtualScrollerContent ": {
            backgroundColor: "#fff !important"
        },
        "& .MuiDataGrid-columnHeader": {
            color: "white",
            backgroundColor: "#2f80ed",
        },
        "& .MuiDataGrid-footerContainer": {
        },
        "& .MuiDataGrid-iconSeparator": {
            display: "none"

        },
        "& .MuiDataGrid-main": {
            overflow: "unset"
        },

        "& .MuiDataGrid-cell": {
            display: "flex",
            fontWeight: "bold"

        },
        "& .MuiDataGrid-cell--textLef": {
            display: "flex",
            fontWeight: "bold",
            color: "#0171BC"
        },
        "& .cardContainer": {
            backgroundColor: "#ffffff",
            padding: "20px",
            Width: "50% !important",
            borderRadius: "20px",
            "& .cardpo": {
                padding: "20px",
                display: "flex",
                "& .firstName": {
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#808080",
                    lineHeight: "30px"
                },
                "& .lastName": {
                    height: "30px",
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#000000",
                    fontWeight: "500",
                },
                [theme.breakpoints.down('lg')]: {
                    flexDirection: "row",
                    gap: "40px",
                },
                "@media (min-width:600px)": {
                    flexDirection: "row",
                    gap: "40px",
                },
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    height: "10px"
                }

            },
            "& .userImage": {
                borderRadius: "12px",
                objectFit: "cover"
            },
            "& .editInfoButton": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "38px",
                borderRadius: "50px",
                textTransform: "none",
            },
        },
        "& .userCardButtons": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
            "@media (min-width:600px)": {
                flexDirection: "row",
                gap: "20px",
            },
            "& .Buttonpo": {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                height: "38px",
                borderRadius: "50px",
                textTransform: "none",
            }
        }
    }
}));

export default function UserInfromation() {
    const [userFields, setUserFields] = useState({})
    const [alert, setAlert] = useState({
        alertColor: "primary",
        alertMessage: "",
        isAlertOpen: false,
    });
    const [user, setUser] = useState({
        list: [],
        detail: {},
        isEdit: false
    })
    const [expense, setExpense] = useState({
        list: [],
        filterList: [],
        detail: {}
    })
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleOpenDetail = (id) => {
        navigate("/expensereports", { state: { id: id } })
    }
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const columns = [
        {
            field: 'userName',
            headerName: 'Employee',
            width: 200,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            renderCell: (params) =>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#0171BC"
                    }}>
                    ${params.value}
                </Typography>
        },
        {
            field: 'dateOfSubmitted',
            headerName: 'Date',
            width: 200,
            renderCell: (params) =>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#828282"
                    }}>
                    {Helpers.dateFormater(params.value)}
                </Typography>
        },
        {
            field: '_id',
            headerName: 'View Report',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleOpenDetail(params.value)}>
                    <Visibility sx={{ color: "#0171BC" }} />
                </IconButton>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            // width: 200,
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button sx={{
                        backgroundColor: params.value === "Pending" ? "#FEFFE5" : params.value === "Approved" ? "#f0fff8" : "#fff0f0",
                        textTransform: "none",
                        fontWeight: "bold",
                        color: params.value === "Pending" ? "#FFBC10" : params.value === "Approved" ? "#18ab56" : "#eb5757",
                        height: "40px",
                        width: "100px",
                        borderRadius: "5px",
                        border: params.value === "Pending" ? "1px solid #FFBC10" : params.value === "Approved" ? "1px solid #18ab56" : "1px solid #eb5757",

                    }}>
                        {params.value}
                    </Button>
                </Box>
            )
        },
        {
            field: 'userId',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <>
                    <IconButton>
                        <MoreVertIcon onClick={handleClick} />
                    </IconButton>
                    <Menu
                        sx={{ "& .MuiPaper-root ": { boxShadow: "#aba4a43d 0px 3px 8px" } }}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleCloseMenu}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}>
                        <MenuItem onClick={handleCloseMenu}>
                            <Button sx={{
                                backgroundColor: "#f0fff8",
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "#18ab56",
                                height: "40px",
                                width: "100px",
                                borderRadius: "5px",
                                border: "1px solid #18ab56",

                            }}>
                                Approved
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <Button sx={{
                                backgroundColor: "#FEFFE5",
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "#FFBC10",
                                height: "40px",
                                width: "100px",
                                borderRadius: "5px",
                                border: "1px solid #FFBC10",

                            }}>
                                Pending
                            </Button>
                        </MenuItem>
                        <MenuItem onClick={handleCloseMenu}>
                            <Button sx={{
                                backgroundColor: "#fff0f0",
                                textTransform: "none",
                                fontWeight: "bold",
                                color: "#eb5757",
                                height: "40px",
                                width: "100px",
                                borderRadius: "5px",
                                border: "1px solid #eb5757",

                            }}>
                                Rejected
                            </Button>
                        </MenuItem>
                    </Menu>
                    <IconButton>
                        <KeyboardArrowDownIcon onClick={() => handleOpenDetail(params.value)} />
                    </IconButton>

                </>

            )
        },

    ];
    useEffect(() => {
        getExpenseList()
    }, [])
    const getExpenseList = async () => {
        setIsLoading(true)
        try {
            let res = await ExpenseService.getlist()
            if (res.success) {
                setExpense({ ...expense, list: res.data, filterList: res.data })
                setIsLoading(false)
            } else {
                setIsLoading(false)
            }

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let { state } = useLocation()
    useEffect(() => {
        if (state?.id) {
            getUserDetail()
        }
    }, [state])
    useEffect(() => {
        const formattedUserFields = {
            ...user.detail,
            updatedDate: Helpers.dateFormater1(user.detail.updatedDate),
            createdDate: Helpers.dateFormater1(user.detail.createdDate),
        };
        console.log(formattedUserFields)
        setUserFields(formattedUserFields);
    }, [user.isEdit])
    const handleEdit = async () => {
        if (user.isEdit) {
            setIsLoading(true)
            let clientData = AuthService.getUserData()
            userFields.clientId = clientData.clientId
            try {

                setIsSubmit(true)
                if (!userFields?.firstName || !userFields?.lastName || !userFields?.email || !userFields?.department || !userFields?.phoneNumber || !userFields?.status || !userFields?.createdDate || !userFields?.updatedDate) {
                    return
                }
                let res = await UserServices.updateUsers(state?.id, userFields)
                if (res.success) {
                    // setUser({ ...user, detail: res.data })

                    setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
                    setUser({ ...user, isEdit: false })
                    getUserDetail()
                    setIsLoading(false)

                }
                else {
                    setIsLoading(false)
                    setAlert({ ...alert, isAlertOpen: true, alertColor: "error", alertMessage: res.error });
                }

            } catch (error) {
                setIsLoading(false)
                console.error(error)
            }


        } else {
            setUser({ ...user, isEdit: true })
        }
    }
    const getUserDetail = async () => {
        let data = {
            id: state?.id
        }
        try {
            let res = await UserServices.getDetail(data)
            if (res.success) {
                setUser({ ...user, detail: res.data, isEdit: false })
            } else {
                // alert("failed")
            }

        } catch (error) {
            console.error(error)
        }
    }
    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/user`;
        navigate(path);
    }
    const handleChange = (event) => {
        let { name, value } = event.target
        setUserFields({ ...userFields, [name]: value });
    };




    return (
        <Root>
            <Box className='mainContainer'>
                <Box>
                    <Box className='cardContainer'>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            gap: "10px",
                            "@media (min-width:600px)": {
                                flexDirection: "row",
                                gap: 0,
                            },
                        }}>
                            <Button onClick={routeChange} sx={{ color: "black", display: "flex", gap: "8px", textTransform: "none" }} variant="text">
                                <KeyboardBackspaceIcon /> Back
                            </Button>
                            <Button className='editInfoButton' startIcon={isLoading ? <CircularProgress sx={{ color: "#fff" }} size={20} /> : ""} onClick={handleEdit} variant="contained">{user.isEdit ? "Save" : "Edit Information"}</Button>
                        </Box>
                        <Box className='cardpo'>
                            <Box sx={{
                                height: "300px",
                                width: "350px",
                            }}>
                                <img className='userImage' src={image} width="100%" height="100%" alt="User" />
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className='firstName'>First Name</Typography>
                                        {user.isEdit ?
                                            <TextField className='inputField1'
                                                error={!userFields?.firstName && isSubmit}
                                                helperText={!userFields?.firstName && isSubmit ? "First Name is required." : ""}
                                                variant='outlined' value={userFields?.firstName || ''}
                                                onChange={handleChange} fullWidth type='text' name='firstName' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {user?.detail?.firstName}
                                            </Typography>}
                                        <Typography className='firstName' sx={{ textTransform: "none" }}>Email Address</Typography>
                                        {user.isEdit ?
                                            <TextField className='inputField1'
                                                error={!userFields?.firstName && isSubmit}
                                                helperText={!userFields?.email && isSubmit ? "Email is required." : ""}
                                                value={userFields?.email || ''}
                                                onChange={handleChange} variant='outlined'
                                                fullWidth type='text' name='email' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {user?.detail?.email}
                                            </Typography>}
                                        <Typography className='firstName' sx={{ textTransform: "none" }}>Team</Typography>
                                        {user.isEdit ?
                                            <TextField className='inputField1'
                                                error={!userFields?.department && isSubmit}
                                                helperText={!userFields?.department && isSubmit ? "Team is required." : ""}
                                                value={userFields?.department || ''}
                                                onChange={handleChange}
                                                variant='outlined' fullWidth
                                                type='text'
                                                name='department' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {user?.detail?.department}
                                            </Typography>}
                                        <Typography className='firstName' sx={{ textTransform: "none" }}>Role</Typography>
                                        {user.isEdit ?
                                            <TextField inputProps={{ maxLength: 11 }}
                                                error={!userFields?.role && isSubmit}
                                                helperText={!userFields?.role && isSubmit ? "Phone Number is required." : ""}
                                                value={userFields?.role || ''}
                                                onChange={handleChange}
                                                className='inputField1'
                                                variant='outlined' fullWidth
                                                type='role'
                                                name='role' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {user?.detail?.role}
                                            </Typography>}
                                        <Typography variant="h6" className='firstName' sx={{ textTransform: "none" }}>User's Creation Date</Typography>
                                        {user.isEdit ?
                                            <TextField className='inputField1'
                                                error={!userFields?.createdDate && isSubmit}
                                                helperText={!userFields?.createdDate && isSubmit ? "Create date is required." : ""}
                                                value={userFields?.createdDate || ''}
                                                onChange={handleChange} variant='outlined'
                                                fullWidth
                                                type='date' name='createdDate' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {Helpers.dateFormater(user?.detail?.createdDate)}
                                            </Typography>}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography className='firstName' sx={{ textTransform: "none" }}>Last Name</Typography>
                                        {user.isEdit ?
                                            <TextField className='inputField1'
                                                error={!userFields?.lastName && isSubmit}
                                                helperText={!userFields?.lastName && isSubmit ? "Last Name is required." : ""}
                                                value={userFields?.lastName || ''}
                                                onChange={handleChange}
                                                variant='outlined' fullWidth
                                                type='text' name='lastName' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {user?.detail?.lastName}
                                            </Typography>}
                                        <Typography className='firstName' sx={{ textTransform: "none" }}>Phone Number</Typography>
                                        {user.isEdit ?
                                            <TextField inputProps={{ maxLength: 11 }}
                                                error={!userFields?.phoneNumber && isSubmit}
                                                helperText={!userFields?.phoneNumber && isSubmit ? "Phone Number is required." : ""}
                                                value={userFields?.phoneNumber || ''}
                                                onChange={handleChange}
                                                className='inputField1'
                                                variant='outlined' fullWidth
                                                type='number'
                                                name='phoneNumber' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {user?.detail?.phoneNumber}
                                            </Typography>}


                                        <Typography className='firstName' sx={{ textTransform: "none" }}>Status</Typography>
                                        {user.isEdit ? (
                                            <FormControl sx={{
                                                "& .MuiInputBase-root": {
                                                    height: "42px"
                                                }
                                            }} fullWidth className='inputField1'>
                                                <Select
                                                    error={!userFields?.status && isSubmit}
                                                    helperText={!userFields?.status && isSubmit ? "Status is required." : ""}
                                                    value={userFields?.status || ''}
                                                    onChange={handleChange}
                                                    name='status'
                                                    displayEmpty
                                                >
                                                    <MenuItem value=''>Select Status</MenuItem>
                                                    <MenuItem value='active'>Active</MenuItem>
                                                    <MenuItem value='inactive'>Inactive</MenuItem>
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <Typography className='lastName' sx={{ fontSize: "14px", textTransform: "none" }}>
                                                {user?.detail?.status}
                                            </Typography>
                                        )}
                                        <Typography className='firstName' sx={{ textTransform: "none" }}>Last Activity</Typography>
                                        {user.isEdit ?
                                            <TextField className='inputField1'
                                                error={!userFields?.updatedDate && isSubmit}
                                                helperText={!userFields?.updatedDate && isSubmit ? "Updated Date is required." : ""}
                                                value={userFields?.updatedDate || ''}
                                                onChange={handleChange}
                                                variant='outlined'
                                                fullWidth type='date'
                                                name='updatedDate' /> :
                                            <Typography className='lastName'
                                                sx={{ textTransform: "none" }}>
                                                {Helpers.dateFormater(user?.detail?.updatedDate)}
                                            </Typography>}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Box className="userCardButtons">
                            <Button className='Buttonpo' variant="contained">
                                <img width='20px' src={expenseReportIcon} alt="Expense Report Icon" />
                                <span>Expense Report</span>
                            </Button>
                            <Button className='Buttonpo' variant="contained">
                                <img width='20px' src={activityReport} alt="Activity Report Icon" />
                                <span>Activity Report</span>
                            </Button>
                            <Button className='Buttonpo' variant="contained">
                                <img width='20px' src={userAbsense} alt="User Absence Icon" />
                                <span>User Absences</span>
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: "20px", height: 200, overflowY: "auto" }}>
                        <DataGrid
                            autoHeight
                            minHeight={40}
                            rows={expense?.filterList || []}
                            columns={columns}
                            getRowId={(e) => e._id}
                            loading={isLoading}
                            pageSizeOptions={[5]}
                            disableColumnFilter
                            disableColumnMenu
                            checkboxSelection
                            hideFooterPagination
                            slots={{
                                NoRowsOverlay: CustomNoRowsOverlay,
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box>
                <AlertSnackbar alert={alert} setAlert={setAlert} />
            </Box>
        </Root>
    );
}
