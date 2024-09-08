import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Dialog, DialogContent, Grid, Menu, TextField, CircularProgress } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TbEdit } from "react-icons/tb";
import styled from '@mui/system/styled';

import { DataGrid } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ExpenseReportForm from './AddExpenseReport';
import { Helpers } from '../../Shell/Helper';
import { ExpenseService } from '../../Services/Expense/ExpenseService';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomNoRowsOverlay from '../../Componenets/NoDataFound';


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
    margin: 0,
    padding: 0,
    "& .mainContainer": {

        padding: "20px",
        backgroundColor: "#fafbfc",
        "& .mainBox": {
            backgroundColor: "#efecec",
            borderRadius: "20px 20px 0px 0px ",
            padding: "20px 40px"
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
const ExpenseList = () => {
    const [expense, setExpense] = useState({
        list: [],
        filterList: [],
        detail: {}
    })
    const [userFields, setUserFields] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [isChange, setIsChange] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [isFltShow, setIsFltShow] = useState(false);

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
            headerName: 'Employe',
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
                        }} >
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
    useEffect(() => {
        getExpenseList()
    }, [isChange])


    //Get user List

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
    // navigate to Details
    const handleOpenDetail = (id) => {
        navigate("/expensereports", { state: { id: id, from: "expense" } })
    }
    const openExpenseForm = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const serchUser = () => {
        const status = userFields?.status?.toLowerCase() || '';
        const amount = userFields?.amount || '';
        const date = userFields?.date?.toLowerCase() || '';
        let filterData = expense?.list?.filter((expense) =>
            (!status || expense?.status?.toLowerCase().includes(status)) &&
            (!amount || expense?.amount.toString().includes(amount)) &&
            (!date || expense?.date?.toLowerCase().includes(date))
        );
        setExpense({ ...expense, filterList: filterData })
    }
    const handleChange = (e) => {
        setUserFields({ ...userFields, [e.target.name]: e.target.value })
    }
    const handleFilter = () => {
        setIsFltShow(!isFltShow)
    }
    return (
        <Root>

            <Box className="mainContainer">

                <Box className="mainBox">
                    <Grid justifyContent="flex-end" xs={12} container className="headerSection">
                        <Grid item xs={6}></Grid>
                        <Grid container alignItems="center" justifyContent="end" item xs={6}>
                            <Button sx={{
                                height: "38px",
                                textTransform: "none"
                            }}
                                onClick={openExpenseForm}
                                variant="contained"
                            >Create Expense Report</Button>

                            <Button sx={{
                                marginLeft: "8px",
                                textTransform: "none"
                            }} onClick={handleFilter} variant="contained">Filters</Button>
                        </Grid>
                        {isFltShow ? <Grid container backgroundColor="#fff" justifyContent="space-between" sx={{ borderRadius: "10px" }} p={2} my={2} >
                            <Grid item xs={5.5} >
                                <Typography >Employe</Typography>
                                <TextField
                                    size='small'
                                    fullWidth
                                    className='inputField1'
                                    variant='outlined'
                                    onChange={handleChange}
                                    name='firstName' />
                                <Typography sx={{ textTransform: "none" }}>Date</Typography>
                                <TextField className='inputField1'
                                    fullWidth size='small' type='date'
                                    value={userFields?.date || ''}
                                    onChange={handleChange}
                                    name='date' />


                            </Grid>
                            <Grid item xs={5.5} >
                                <Typography sx={{ textTransform: "none" }}>Amount</Typography>
                                <TextField className='inputField1' fullWidth size='small' type='number'
                                    value={userFields?.amount || ''}
                                    onChange={handleChange}
                                    name='amount' />
                                <Typography sx={{ textTransform: "none" }}>Status</Typography>
                                <FormControl fullWidth className='inputField1'>
                                    <Select
                                        size='small'
                                        value={userFields?.status || ''}
                                        onChange={handleChange}
                                        name='status'
                                        displayEmpty
                                    >
                                        <MenuItem value=''>Select Status</MenuItem>
                                        <MenuItem value='approved'>Approved</MenuItem>
                                        <MenuItem value='pending'>Pending</MenuItem>
                                        <MenuItem value='rejected'>Rejected</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} mt={2} textAlign="right"  >
                                <Button startIcon={isLoading ? <CircularProgress sx={{ color: "#fff" }} size={20} /> : ""} onClick={serchUser} sx={{
                                    height: "38px",
                                    textTransform: "none"
                                }} variant="contained">Search</Button>
                            </Grid>
                        </Grid> : ""}

                    </Grid>
                    <Box sx={{ marginTop: isFltShow ? 0 : "12px", height: isFltShow ? 750 : 1000, overflowY: "auto" }}>
                        <DataGrid
                            autoHeight
                            minHeight={40}
                            rows={expense?.filterList || []}
                            columns={columns}
                            getRowId={(e) => e._id}
                            loading={isLoading}
                            disableColumnFilter
                            disableColumnMenu
                            checkboxSelection
                            initialState={{
                                ...expense.initialState,
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]} slots={{
                                noRowsOverlay: CustomNoRowsOverlay,  // Ensure to use the correct casing
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            {/* <SubmitLoader /> */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        margin: 0,
                        maxWidth: '800px',
                        width: '800px',
                        height: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'visible',
                    },
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description" >
                <DialogContent
                    style={{
                        padding: '16px',
                        overflow: 'visible',
                    }} >
                    <ExpenseReportForm isChange={isChange} setIsChange={setIsChange} open={open} setOpen={setOpen} />
                </DialogContent>
            </Dialog>

        </Root>
    )
}


export default ExpenseList