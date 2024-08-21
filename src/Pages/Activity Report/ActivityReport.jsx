import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Dialog, DialogContent, Grid, Menu } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@mui/system/styled';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import CustomNoRowsOverlay from '../../Componenets/NoDataFound';
import { Helpers } from '../../Shell/Helper';
import { ExpenseService } from '../../Services/Expense/ExpenseService';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const Root = styled(Box)({
    "& .userImage": {
        borderRadius: "50px"
    },
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
        // backgroundColor: "#d6dcd399"
    },
    "& .MuiDataGrid-iconSeparator": {
        display: "none"

    },
    "& .MuiDataGrid-main": {
        // remove overflow hidden overwise sticky does not work
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
    margin: 0,
    padding: 0,
    "& .mainContainer": {

        padding: "20px",
        backgroundColor: "#fafbfc",
        "& .mainBox": {
            backgroundColor: "#F8F8F8",
            borderRadius: "44px 44px 0px 0px ",
            padding: "0px 40px 0px 40px"
        },
        "& .headerSection": {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10
        },
        " & .inputField": {
            backgroundColor: "#ffffff",
            width: "504px",
            height: "42px",
            borderRadius: "146px",
            boxShadow: "0px 2px 3px 0px #ccc",
            "& .MuiOutlinedInput-input": {
                padding: "9px 0 5px"
            }
        }
    }

});
const ActivityReport = () => {
    const [expense, setExpense] = useState({
        list: [],
        filterList: [],
        detail: {}
    })
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    let navigate = useNavigate()

    const columns = [
        {
            field: 'userName',
            headerName: 'Employee',
            width: 350,
        },
        {
            field: 'contact',
            headerName: 'Contact',
            width: 270,
            renderCell: (params) =>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#0171BC"
                    }}>
                    {params.value}
                </Typography>
        },
        {
            field: 'dateOfSubmitted',
            headerName: 'Date',
            width: 230,
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
            field: 'status',
            headerName: 'Status',
            width: 250,
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
            width: 150,
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
                            'aria-labelledby': 'basic-button',
                        }}
                    >

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
    const handleChange = (event) => {
        setAge(event.target.value);
    };


    //Get user List

    const getExpenseList = async () => {
        setIsLoading(true)
        try {
            let res = await ExpenseService.getlist()
            if (res.success) {
                setExpense({ ...expense, list: res.data, filterList: res.data })
                setIsLoading(false)
            } else {
                // alert("failed")
                setIsLoading(false)
            }

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }



    // navigate to Details
    const handleOpenDetail = (id) => {
        navigate("/expensereports", { state: { id: id } })
    }
    const openAddActivityReport = () => {
        navigate("/add-activity")
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Root>

            <Box className="mainContainer">

                <Box className="mainBox">
                    {/* --------------------Header Section--------------- */}
                    <Grid justifyContent="flex-end" xs={12} container className="headerSection">
                        <Grid item xs={6}></Grid>
                        <Grid container alignItems="center" justifyContent="end" item xs={6}>
                            <Button sx={{
                                height: "38px",
                                textTransform: "none"
                            }}
                                onClick={openAddActivityReport}
                                variant="contained"
                            >Add Activity Report</Button>

                            <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: "#fff", color: "#F8F8F8" }}>
                                <Select
                                    value={age}
                                    size='small'
                                    onChange={handleChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <Typography sx={{ color: "#0171BC" }}>filters</Typography>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    {/* --------------------Header Section Complete--------------- */}
                    <Box sx={{ height: 800, overflowY: "auto" }}>


                        <DataGrid
                            autoHeight

                            minHeight={40}
                            rows={expense?.list || []}
                            columns={columns}
                            getRowId={(e) => e._id}
                            // initialState={{
                            //     pagination: {
                            //         paginationModel: {
                            //             pageSize: 5,
                            //         },
                            //     },
                            // }}
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
        </Root>
    )
}


export default ActivityReport