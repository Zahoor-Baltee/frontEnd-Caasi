import React, { useEffect, useState } from 'react'
import { Box, TextField, InputAdornment, Button, IconButton, Grid } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TbEdit } from "react-icons/tb";
import styled from '@mui/system/styled';
import userImage from '../../Assets/man.png'
import CircularProgress from "@mui/material/CircularProgress"
import { DataGrid } from '@mui/x-data-grid';
import { UserServices } from '../../Services/User/UserServices';
import { useNavigate } from 'react-router-dom';
import SubmitLoader from '../../Componenets/SubmitLoader';
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
        display: "flex"

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
            height: "45px",
            borderRadius: "10px",
            boxShadow: "0px 2px 3px 0px #ccc",
            "& .MuiOutlinedInput-input": {
                padding: "9px 0 5px"
            }
        }
    }

});
const User = () => {
    const [user, setUser] = useState({
        list: [],
        filterList: [],
        detail: {}
    })
    const [userFields, setUserFields] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [isFltShow, setIsFltShow] = useState(false);
    let navigate = useNavigate()
    const columns = [
        {
            field: 'firstName', headerName: 'Name', width: 350, renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "start", gap: "10px", alignItems: "center" }}>
                    <Box sx={{ height: "40px", width: "40px" }}>
                        <img className='userImage' src={userImage} sx={{ borderRadius: "50px !important" }} height='100%' width='100%' alt='lol' />
                    </Box>
                    <Typography variant="body1" sx={{ color: '#000000' }}>{params.value} {params.row.lastName}</Typography>
                </Box>
            )
        },

        { field: 'department', headerName: 'Department', width: 270, },
        { field: 'role', headerName: 'Role', width: 230, },
        { field: 'email', headerName: 'Email', width: 300, },
        { field: 'status', headerName: 'Status', flex: 1, },
        {
            field: '_id', headerName: 'Edit', width: 100, renderCell: (params) => (
                <IconButton onClick={() => handleOpenDetail(params.value)}>

                    <TbEdit style={{ marginLeft: '-6px' }} />

                </IconButton>

            )
        },

    ];
    useEffect(() => {
        getUserList()
    }, [])


    const handleOpenDetail = (id) => {
        navigate("/userinformation", { state: { id: id } })
    }
    //Get user List

    const getUserList = async () => {
        setIsLoading(true)
        try {
            let res = await UserServices.getlist()
            if (res.success) {
                setUser({ ...user, list: res.data, filterList: res.data })
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


    const handleSearch = (event) => {
        let { value } = event.target
        let filterDataByFirstName = user?.list?.filter(item => item?.firstName?.toLowerCase().includes(value?.toLowerCase()))
        setUser({ ...user, filterList: filterDataByFirstName })
    }
    const handleChange = (e) => {
        setUserFields({ ...userFields, [e.target.name]: e.target.value })
    }
    const serchUser = () => {
        let filterData = user?.list?.filter(user =>
            (!userFields.status || user?.status?.toLowerCase().includes(userFields.status.toLowerCase())) &&
            (!userFields.department || user?.department?.toLowerCase().includes(userFields.department.toLowerCase())) &&
            (!userFields.role || user?.role?.toLowerCase().includes(userFields.role.toLowerCase()))
        );
        setUser({ ...user, filterList: filterData })
    }
    const handleFilter = () => {
        setIsFltShow(!isFltShow)
    }
    return (
        <Root>

            <Box className="mainContainer">
                <Grid container alignItems="center" className="mainBox">
                    <Grid item xs={6} >
                        <TextField
                            sx={{
                                "& fieldset": { border: 'none' },
                                "& .MuiInputBase-input": {
                                    marginTop: "2px"
                                }
                            }}
                            className='inputField'
                            placeholder='Search'
                            onChange={handleSearch}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ marginTop: "8px" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid textAlign="end" xs={6} >
                        <Button sx={{
                            textTransform: "none"
                        }} onClick={() => { navigate('/user-add') }} variant="contained">Create user</Button>
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
                                name='firstName' />
                            <Typography sx={{ textTransform: "none" }}>Email</Typography>
                            <TextField className='inputField1' fullWidth size='small' type='text'
                                value={userFields?.email || ''}
                                onChange={handleChange}
                                name='email' />
                        </Grid>
                        <Grid item xs={5.5} >
                            <Typography sx={{ textTransform: "none" }}>Department</Typography>
                            <TextField className='inputField1' fullWidth size='small' type='text'
                                value={userFields?.department || ''}
                                onChange={handleChange}
                                name='department' />
                            <Typography sx={{ textTransform: "none" }}>Role</Typography>
                            <TextField className='inputField1'
                                fullWidth size='small' type='text'
                                value={userFields?.role || ''}
                                onChange={handleChange}
                                name='role' />
                        </Grid>
                        <Grid item xs={12} mt={2} textAlign="right"  >
                            <Button startIcon={isLoading ? <CircularProgress sx={{ color: "#fff" }} size={20} /> : ""} onClick={serchUser} sx={{
                                height: "38px",
                                textTransform: "none"
                            }} variant="contained">Search</Button>
                        </Grid>
                    </Grid> : ""}
                    <Grid xs={12} sx={{ marginTop: isFltShow ? 0 : "12px", height: isFltShow ? 750 : 1000, overflowY: "auto" }}>
                        <DataGrid
                            autoHeight
                            minHeight={40}
                            rows={user?.filterList || []}
                            columns={columns}
                            getRowId={(e) => e._id}
                            loading={isLoading}
                            disableColumnFilter
                            disableColumnMenu
                            checkboxSelection
                            initialState={{
                                ...user.initialState,
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
                            // hideFooterPagination
                            slots={{
                                noRowsOverlay: CustomNoRowsOverlay,  // Ensure to use the correct casing
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            {/* <SubmitLoader /> */}


        </Root>
    )
}


export default User