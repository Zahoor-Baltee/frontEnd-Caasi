import React, { useEffect, useState } from 'react'
import { Box, TextField, InputAdornment, Button, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TbEdit } from "react-icons/tb";
import styled from '@mui/system/styled';
import userImage from '../../Assets/man.png'


import { DataGrid } from '@mui/x-data-grid';

import { UserServices } from '../../Services/User/UserServices';
import { useNavigate } from 'react-router-dom';
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
        backgroundColor: "#2f80ed"
    },
    "& .MuiDataGrid-footerContainer": {
        // backgroundColor: "#d6dcd399"
    },
    "& .MuiDataGrid-iconSeparator": {
        display: "none"

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
            height: "38px",
            borderRadius: "146px",
            boxShadow: "0px 2px 3px 0px #ccc",
            "& .MuiOutlinedInput-input": {
                padding: "7px 0 5px"
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
    const [isLoading, setIsLoading] = useState(false);
    const [age, setAge] = React.useState('');
    let navigate = useNavigate()
    const columns = [
        {
            field: 'firstName', headerName: 'Name', flex: 1, renderCell: (params) => (
                <Box sx={{ display: "flex", justifyContent: "start", gap: "10px", alignItems: "center" }}>
                    <Box sx={{ height: "40px", width: "40px" }}>
                        <img className='userImage' src={userImage} sx={{ borderRadius: "50px !important" }} height='100%' width='100%' alt='lol' />
                    </Box>
                    <Typography variant="body1" sx={{ color: '#000000' }}>{params.value} {params.row.lastName}</Typography>
                </Box>
            )
        },

        { field: 'department', headerName: 'Department', width: 335, },
        { field: 'role', headerName: 'Role', width: 200, },
        { field: 'email', headerName: 'Email', width: 280, },
        { field: 'status', headerName: 'Status', width: 230, },
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
    const handleChange = (event) => {
        setAge(event.target.value);
    };

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

    return (
        <Root>
            <Box className="mainContainer">

                <Box className="mainBox">
                    {/* --------------------Header Section--------------- */}
                    <Box className="headerSection">
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <TextField
                                sx={{
                                    "& fieldset": { border: 'none' },
                                }}
                                className='inputField'
                                placeholder='Search'
                                onChange={handleSearch}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"

                        }}>
                            <Button sx={{
                                height: "38px",
                                textTransform: "none"
                            }} onClick={() => { navigate('/user-add') }} variant="contained">Create user</Button>
                            <div>
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
                            </div>
                        </Box>
                    </Box>
                    {/* --------------------Header Section Complete--------------- */}
                    <DataGrid
                        minHeight={40}
                        rows={user?.filterList || []}
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
                        components={{
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                    />
                </Box>

            </Box>
        </Root>
    )
}


export default User