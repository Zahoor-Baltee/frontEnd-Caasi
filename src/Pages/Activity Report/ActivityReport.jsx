import React, { useEffect, useState } from 'react'
import { Box, Button, IconButton, Grid, Menu, TextField, CircularProgress } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@mui/system/styled';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Helpers } from '../../Shell/Helper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ActivityService } from '../../Services/Activity/ActivityServices';
import CustomNoRowsOverlay from '../../Componenets/NoDataFound';


const Root = styled(Box)({
    "& .userImage": {
        borderRadius: "50px"
    },
    "& .MuiDataGrid-container--top": {
        backgroundColor: "yellow"
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
            // backgroundColor: "#efecec",
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
const ActivityReport = () => {
    const [activity, setActivity] = useState({
        list: [],
        filterList: [],
        detail: {}
    })
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const [isFltShow, setIsFltShow] = useState(false);
    const [userFields, setUserFields] = useState({})

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    let navigate = useNavigate()

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            renderCell: (params) =>
                <Typography
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#0171BC"
                    }}>
                    {params.value} {params.row.surname}
                </Typography>
        },
        {
            field: 'contactNumber',
            headerName: 'Contact',
            width: 200,
            renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "start", flexDirection: "column", alignItems: "start" }}>
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#828282",
                        }}
                    >
                        {params.row.email}
                    </Typography>
                    <Typography
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#828282",
                        }}
                    >
                        {params.value}
                    </Typography>
                </Box>
            ),
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
            field: 'status',
            headerName: 'Status',
            // width: 200,
            flex: 1,
            renderCell: (params) => (
                <Typography sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#828282"
                }}>
                    {params.value}
                </Typography>
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
        getActivityReportList()
    }, [])

    //Get user List

    const getActivityReportList = async () => {
        setIsLoading(true)
        try {
            let res = await ActivityService.getlist()
            if (res.success) {
                setActivity({ ...activity, list: res.data, filterList: res.data })
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
        navigate("/activity-add")
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleFilter = () => {
        setIsFltShow(!isFltShow)
    }
    const serchUser = () => {
        const status = userFields?.status ? userFields.status.toLowerCase() : '';
        const contact = userFields?.contact ? userFields.contact.toLowerCase() : '';
        const date = userFields?.date ? userFields.date.toLowerCase() : '';
        const name = userFields?.name ? userFields.name.toLowerCase() : '';

        const filterData = activity.list.filter((activityItem) => {
            const activityStatus = activityItem.status ? activityItem.status.toLowerCase() : '';
            const activityContact = activityItem.contactNumber ? activityItem.contactNumber.toLowerCase() : '';
            const activityDate = activityItem.dateOfSubmitted ? activityItem.dateOfSubmitted.toLowerCase() : '';
            const activityName = activityItem.name ? activityItem.name.toLowerCase() : '';

            return (
                (!status || activityStatus.includes(status)) &&
                (!contact || activityContact.includes(contact)) &&
                (!date || activityDate.includes(date)) &&
                (!name || activityName.includes(name))
            );
        });

        setActivity({ ...activity, filterList: filterData });
    };
    const handleChange = (e) => {
        setUserFields({ ...userFields, [e.target.name]: e.target.value });
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
                            <Button sx={{
                                marginLeft: "8px",
                                textTransform: "none"
                            }} onClick={handleFilter} variant="contained">Filters</Button>
                        </Grid>
                        {isFltShow ? <Grid container backgroundColor="#fff" justifyContent="space-between" sx={{ borderRadius: "10px" }} p={2} my={2} >
                            <Grid item xs={5.5} >
                                <Typography >Name</Typography>
                                <TextField
                                    size='small'
                                    fullWidth
                                    className='inputField1'
                                    variant='outlined'
                                    onChange={handleChange}
                                    name='name' />
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
                                        <MenuItem value='active'>Active</MenuItem>
                                        <MenuItem value='inactive'>InActive</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={5.5} >

                                <Typography sx={{ textTransform: "none" }}>Contact</Typography>
                                <TextField className='inputField1' fullWidth size='small' type='number'
                                    value={userFields?.contact || ''}
                                    onChange={handleChange}
                                    name='contact' />
                                <Typography sx={{ textTransform: "none" }}>Date</Typography>
                                <TextField className='inputField1'
                                    fullWidth size='small' type='date'
                                    value={userFields?.date || ''}
                                    onChange={handleChange}
                                    name='date' />

                            </Grid>
                            <Grid item xs={12} mt={2} textAlign="right"  >
                                <Button startIcon={isLoading ? <CircularProgress sx={{ color: "#fff" }} size={20} /> : ""} onClick={serchUser} sx={{
                                    height: "38px",
                                    textTransform: "none"
                                }} variant="contained">Search</Button>
                            </Grid>
                        </Grid> : ""}

                    </Grid>
                    {/* --------------------Header Section Complete--------------- */}
                    <Box sx={{ marginTop: isFltShow ? 0 : "12px", height: isFltShow ? 750 : 1000, overflowY: "auto" }}>
                        <DataGrid
                            autoHeight
                            minHeight={40}
                            rows={activity.filterList}
                            columns={columns}
                            getRowId={(e) => e._id}
                            loading={isLoading}
                            disableColumnFilter
                            disableColumnMenu
                            checkboxSelection
                            initialState={{
                                ...activity.initialState,
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                            slots={{
                                noRowsOverlay: CustomNoRowsOverlay,  // Ensure to use the correct casing
                            }}
                        />

                    </Box>
                </Box>
            </Box>
        </Root>
    )
}


export default ActivityReport