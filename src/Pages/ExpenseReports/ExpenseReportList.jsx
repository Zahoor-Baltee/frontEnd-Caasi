import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Dialog, DialogContent, Grid } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TbEdit } from "react-icons/tb";
import styled from '@mui/system/styled';

import { DataGrid } from '@mui/x-data-grid';
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomNoRowsOverlay from '../../Componenets/NoDataFound';
import ExpenseReportForm from './AddExpenseReport';
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
const ExpenseList = () => {
    const [expense, setExpense] = useState({
        list: [],
        filterList: [],
        detail: {}
    })
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    let navigate = useNavigate()
    const columns = [
        {
            field: 'userName',
            headerName: 'Employee',
            width: 350,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 270,
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
            field: 'email',
            headerName: 'View Report',
            width: 300,
            renderCell: (params) => (
                <IconButton onClick={() => handleOpenDetail(params.value)}>
                    <Visibility sx={{ color: "#0171BC" }} />
                </IconButton>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 200,
            renderCell: (params) => (
                <Button sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FEFFE5",
                    textTransform: "none",
                    fontWeight: "bold",
                    color: "#FFBC10",
                    height: "40px",
                    width: "100px",
                    borderRadius: "10px"

                }}>
                    {(params.value)}
                </Button>
            )
        },
        {
            field: '_id',
            headerName: 'Actions',
            width: 100,
            renderCell: (params) => (
                <IconButton>
                    <MoreVertIcon onClick={() => handleOpenDetail(params.value)} />
                    {/* <KeyboardArrowDownIcon onClick={() => handleOpenDetail(params.value)} /> */}
                </IconButton>
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
    const openExpenseForm = () => {
        setOpen(true);
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
                        <Button sx={{
                            height: "38px",
                            textTransform: "none"
                        }}
                            onClick={openExpenseForm}
                            variant="contained"
                        >Create Expense Report</Button>

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
            {/* <SubmitLoader /> */}
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        margin: 0, // Remove default margin
                        maxWidth: '800px', // Fixed width
                        width: '800px', // Fixed width
                        height: 'auto', // Allow content to define height
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'visible', // Ensure no overflow scrolling
                    },
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent
                    style={{
                        padding: '16px',
                        overflow: 'visible', // Ensure no internal scrolling
                    }}
                >
                    <ExpenseReportForm open={open} setOpen={setOpen} />
                </DialogContent>
                {/* <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose} autoFocus>
                            Agree
                        </Button>
                    </DialogActions> */}
            </Dialog>

        </Root>
    )
}


export default ExpenseList