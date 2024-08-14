import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton,
    Typography, Button, Pagination, MenuItem, Box,
    Dialog,
    DialogContent,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { Visibility, MoreVert } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/system';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpenseReportForm from '../Pages/ExpenseReports/AddExpenseReport';
import { ExpenseService } from '../Services/Expense/ExpenseService';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const StatusButton = styled(Button)(({ status }) => ({
    color: status === 'Approved' ? '#fff' : '#000',
    backgroundColor: status === 'Approved' ? '#4caf50' : status === 'Pending' ? '#ff9800' : '#f44336',
    pointerEvents: 'none',
}));

const tableData = [
    { id: 1, name: 'Albert Flores', lastName: 'Flores', amount: '$1000', date: '23 Feb 2024', status: 'Approved' },
    { id: 2, name: 'Wade Warren', lastName: 'Warren', amount: '$1000', date: '23 Feb 2024', status: 'Approved' },
    { id: 3, name: 'Ronald Richards', lastName: 'Richards', amount: '$1000', date: '23 Feb 2024', status: 'Pending' },
    { id: 4, name: 'Courtney Henry', lastName: 'Courtney', amount: '$1000', date: '23 Feb 2024', status: 'Rejected' },
    { id: 5, name: 'Courtney Henry', lastName: 'Courtney', amount: '$1000', date: '23 Feb 2024', status: 'Rejected' },
    { id: 6, name: 'Courtney Henry', lastName: 'Courtney', amount: '$1000', date: '23 Feb 2024', status: 'Rejected' },

    // Add more rows as necessary
];

const Root = styled(Box)({
    margin: 0,
    padding: 0,
    // "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
    //     maxHeight: "none"
    // },
    "& .mainContainer": {
        padding: "20px",
        backgroundColor: "#f4f7fe",


        "& .headerSection": {
            display: "flex",
            justifyContent: "space-between",
        },
        "& .TableTags": {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        "& .UpDownIcon": {
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            padding: 0,
            margin: 0
        },
        "& .TableTagsTexts": {
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "600"
        },
        "& .upIcon": {
            marginBottom: "-18px",
            padding: "0px",
            color: "#FFFFFF"
        },
        "& .downIcon": {
            margin: 0,
            padding: 0,
            color: "#FFFFFF"
        }

    }

});

function ExpenseReportTable() {
    const [reports, setReports] = useState({
        list: [],
        detail: {}
    })
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = React.useState(false);

    const columns = [
        {
            field: 'userName', headerName: 'Employee', flex: 1, renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "start", gap: "10px", alignItems: "center" }}>

                    <Typography variant="body1" sx={{ color: '#000000' }}>{params.value}</Typography>
                </Box>
            )
        },

        { field: 'amount', headerName: 'Amount', width: 150, },
        { field: 'createDate', headerName: 'Date', width: 280, },
        {
            field: '_id', headerName: 'View Report', width: 100, renderCell: (params) => (
                <IconButton onClick={() => handleOpenDetail(params.value)}>

                    <VisibilityIcon color="primary" />
                </IconButton>)
        },
        {
            field: 'status', headerName: 'Status', width: 100,
        },
        {
            field: 'id', headerName: 'Action', width: 100, renderCell: (params) => (
                <IconButton onClick={() => handleOpenDetail(params.value)}>

                    <ModeEditOutlineOutlinedIcon />
                </IconButton>

            )
        },

    ];

    const isSelected = (id) => selected.indexOf(id) !== -1;
    let navigate = useNavigate()

    useEffect(() => {
        getReportsList()
    }, [])



    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = tableData.map((row) => row.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };



    const handleCheckboxClick = (id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
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



    //Get user List

    const getReportsList = async () => {

        try {
            let res = await ExpenseService.getlist()
            if (res.success) {
                setReports({ ...reports, list: res.data })
            } else {
                // alert("failed")
                setReports({ ...reports, list: tableData })
            }

        } catch (error) {
            console.error(error)
            setReports({ ...reports, list: tableData })
        }
    }

    return (
        <Root>
            <Box className="mainContainer">
                <Box className="headerSection">

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                        <Typography>Show</Typography>
                        <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: "#fff", color: "#F8F8F8" }}>
                            <Select
                                value={""}
                                onChange={() => { }}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <Typography>10</Typography>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography>entries</Typography>

                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"

                    }}>
                        <Button sx={{
                            width: "237px",
                            height: "53px",
                            textTransform: "none"
                        }} variant="contained" onClick={openExpenseForm}>Create Expense Report</Button>
                        <Box>
                            <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: "#fff", color: "#F8F8F8" }}>
                                <Select
                                    value={""}
                                    onChange={() => { }}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="">
                                        <Typography>filters</Typography>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>


                <DataGrid
                    minHeight={40}
                    rows={reports?.list}
                    columns={columns}
                    getRowId={(e) => e.id}
                    // initialState={{
                    //     pagination: {
                    //         paginationModel: {
                    //             pageSize: 5,
                    //         },
                    //     },
                    // }}
                    pageSizeOptions={[5]}
                    disableColumnFilter
                    disableColumnMenu
                    checkboxSelection
                    hideFooterPagination
                />



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
            </Box>

        </Root>
    );
}

export default ExpenseReportTable;
