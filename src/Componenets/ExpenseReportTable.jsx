import React, { useEffect, useState } from 'react';
import { IconButton, Typography, Button, MenuItem, Box, } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled } from '@mui/system';
import { ExpenseService } from '../Services/Expense/ExpenseService';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const Root = styled(Box)({
    margin: 0,
    padding: 0,
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
    const [open, setOpen] = React.useState(false);

    const columns = [
        {
            field: 'userName', headerName: 'Employee', flex: 1, renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "start", gap: "10px", alignItems: "center" }}>

                    <Typography variant="body1" sx={{ color: '#000000' }}>{params.value}</Typography>
                </Box>
            )
        },

        {
            field: 'amount', headerName: 'Amount', width: 150,
        },
        {
            field: 'createDate', headerName: 'Date', width: 280,
        },
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

    let navigate = useNavigate()

    useEffect(() => {
        getReportsList()
    }, [])

    // navigate to Details
    const handleOpenDetail = (id) => {
        navigate("/expensereports", { state: { id: id } })
    }
    const openExpenseForm = () => {
        setOpen(true);
    }

    //Get user List

    const getReportsList = async () => {

        try {
            let res = await ExpenseService.getlist()
            if (res.success) {
                setReports({ ...reports, list: res.data })
            } else {
                // alert("failed")
                setReports({ ...reports, list: [] })
            }

        } catch (error) {
            console.error(error)
            setReports({ ...reports, list: [] })
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




            </Box>

        </Root>
    );
}

export default ExpenseReportTable;
