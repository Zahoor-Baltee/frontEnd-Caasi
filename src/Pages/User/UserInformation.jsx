import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Typography, Grid, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import image from '../../Assets/man.png';
import expenseReportIcon from '../../Assets/Icon.png';
import activityReport from '../../Assets/activityReport.png';
import userAbsense from '../../Assets/userAbsence.png';
import { useLocation } from 'react-router-dom';
import { UserServices } from '../../Services/User/UserServices';
import { Helpers } from '../../Shell/Helper';
import AuthService from '../../Services/AuthServices';
import AlertSnackbar from '../../Componenets/AlertSnackbar';


const Root = styled(Box)(({ theme }) => ({
    margin: 0,
    padding: 0,
    "& .mainContainer": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f4f7fe",
        "& .cardContainer": {
            flexGrow: 1,
            backgroundColor: "#ffffff",
            padding: "20px",
            maxWidth: "1160px",
            borderRadius: "20px",
            // "@media (min-width:600px)": {
            // },
            "& .cardpo": {
                padding: "20px",
                display: "flex",
                // flexDirection: "column",
                // gap: "50px",
                // "& .inputField1": {
                //     height: "12px"
                // },

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
                "@media (min-width:600px)": {
                    // width: "225px",
                },
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
                "@media (min-width:600px)": {
                    // width: "225px",
                },
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
    const [isSubmit, setIsSubmit] = useState(false);

    let { state } = useLocation()
    useEffect(() => {
        if (state?.id) {
            getUserDetail()
        }
    }, [state])
    useEffect(() => {
        setUserFields(user.detail)
    }, [user.isEdit])
    const handleEdit = async () => {
        if (user.isEdit) {
            let clientData = AuthService.getUserData()
            userFields.clientId = clientData.clientId
            try {
                let res = await UserServices.updateUsers(state?.id, userFields)
                setIsSubmit(true)
                if (!userFields?.firstName || !userFields?.lastName || !userFields?.email || !userFields?.dapartment || !userFields?.phoneNumber || !userFields?.status || !userFields?.createdDate || !userFields?.updatedDate) {
                    return
                }
                if (res.success) {
                    // setUser({ ...user, detail: res.data })
                    setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
                    setUser({ ...user, isEdit: false })
                    getUserDetail()
                } else {
                    setAlert({ ...alert, isAlertOpen: true, alertColor: "error", alertMessage: res.error });
                }

            } catch (error) {
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
                        <Button className='editInfoButton' onClick={handleEdit} variant="contained">{user.isEdit ? "Save" : "Edit Information"}</Button>
                    </Box>
                    <Box className='cardpo'>
                        <Box sx={{
                            height: "300px",
                            width: "350px",
                            // margin: "0 auto",
                            // "@media (min-width:600px)": {
                            //     height: "100%",
                            //     width: "100%",
                            //     margin: 0,
                            // },
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
                                        <Typography className='lastName' sx={{ textTransform: "none" }}>
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
            </Box>
            <Box>
                <AlertSnackbar alert={alert} setAlert={setAlert} />
            </Box>

        </Root>
    );
}
