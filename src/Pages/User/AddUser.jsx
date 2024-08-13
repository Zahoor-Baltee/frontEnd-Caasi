import React, { useEffect, useState } from 'react'
import { Box, TextField, InputAdornment, Button, Grid, } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@mui/system/styled';
import { useNavigate } from 'react-router-dom';
import { UserServices } from '../../Services/User/UserServices';
import { Helpers } from '../../Shell/Helper';
import AuthService from '../../Services/AuthServices';
import userImage from '../../Assets/man.png'




const Root = styled(Box)({
    '& .MuiInput-root': {
        outline: "none",
        '&:before, :after, :hover:not(.Mui-disabled):before': {
            borderBottom: 0,
        },
        "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    },
    margin: 0,
    padding: 0,
    "& .mainContainer": {
        padding: "20px",
        backgroundColor: "#f4f7fe",
        "& .mainBox": {
            backgroundColor: "#F8F8F8",
            borderRadius: "44px 44px 0px 0px ",
            padding: "0px 40px 0px 40px",
            "& .image": {
                height: "100px",
                width: "100px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                " & .inputField1": {
                    backgroundColor: "#ffffff",
                    border: 0,
                    '&:before, :after, :hover:not(.Mui-disabled):before': {
                        borderBottom: 0,
                    },
                }
            },

        },
        "& .headerSection": {
            display: "flex",
            justifyContent: "space-between",
        },
        " & .inputField": {
            backgroundColor: "#ffffff",
            width: "504px",
            Height: "57.43px",
            borderRadius: "146px"
        },
    }

});
const AddUser = () => {
    const [userFields, setUserFields] = useState({

    })
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');

    const validateEmail = (email) => {
        // Basic email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const [age, setAge] = React.useState('');
    let navigate = useNavigate()


    const handleChangeFilter = (event) => {
        setAge(event.target.value);
    };
    const handleChange = (event) => {
        let { name, value } = event.target
        setUserFields({ ...userFields, [name]: value });
        if (name === "email") {
            if (validateEmail(value)) {
                setError(false)
                setHelperText('')
            } else {
                setError(true)
                setHelperText('Please inter a valid Email')
            }
        }
    };

    const handleOpenDetail = (id) => {
        navigate("/userinformation", { state: { id: id } })
    }
    //Get user List

    const createUser = async () => {
        let clientData = AuthService.getUserData()
        let data = userFields
        data.fullName = `${userFields.firstName} ${userFields.lastName}`
        data.clientId = clientData.clientId
        data.userName = clientData.name
        data.password = "12345678"
        try {
            debugger
            let res = await UserServices.creatUsers(data)

            if (res.success) {
                navigateUser()
                alert(res.message)
                // setUser({ ...user, list: res.data })
            } else {
                // alert("failed")
            }

        } catch (error) {
            console.error(error)
        }
    }

    let navigateUser = useNavigate();
    const routeChange = () => {
        let path = '/user';
        navigate(path);
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

                            <div>
                                <FormControl sx={{ m: 1, minWidth: 120, backgroundColor: "#fff", color: "#F8F8F8" }}>
                                    <Select
                                        value={age}
                                        onChange={handleChangeFilter}
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
                            </div>
                        </Box>
                    </Box>
                    {/* --------------------Header Section Complete--------------- */}
                    <Box sx={{ p: 2, width: "100%" }}>
                        <Grid container spacing={2}>
                            <Grid container item xs={4} alignItems="center">
                                <Grid item xs={4}>
                                    <Box sx={{ height: "100px", width: "100px" }} className="image">
                                        <img style={{ borderRadius: "20px" }} height='100%' width='100%' src={userImage} alt="image" />
                                    </Box>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField className='inputField1' variant='outlined' fullWidth type='file' value={userFields?.image || ''} onChange={handleChange} name='image' />
                                </Grid>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid container item xs={12} sm={6} rowGap={1}>
                                <Typography >First Name</Typography>
                                <TextField className='inputField1' variant='outlined' fullWidth type='text' value={userFields?.firstName || ''} onChange={handleChange} name='firstName' />
                                <Typography sx={{ textTransform: "none" }}>Email Address</Typography>
                                <TextField className='inputField1' fullWidth type='email' helperText={helperText}

                                    value={userFields?.email || ''} onChange={handleChange} name='email' />
                                <Typography sx={{ textTransform: "none" }}>Phone Number</Typography>
                                <TextField className='inputField1' inputProps={{ maxLength: 11 }} fullWidth type='text' value={userFields?.phoneNumber || ''} onChange={handleChange} name='phoneNumber' />
                                <Typography sx={{ textTransform: "none" }}>User's Creation Date</Typography>
                                <TextField className='inputField1' fullWidth type='date' value={userFields?.createdDate || ''} onChange={handleChange} name='createdDate' />
                            </Grid>
                            <Grid container item xs={12} sm={6} rowGap={1}>
                                <Typography sx={{ textTransform: "none" }}>Last Name</Typography>
                                <TextField className='inputField1' fullWidth type='text' value={userFields?.lastName || ''} onChange={handleChange} name='lastName' />
                                <Typography sx={{ textTransform: "none" }}>Team</Typography>
                                <TextField className='inputField1' fullWidth type='text' value={userFields?.department || ''} onChange={handleChange} name='department' />
                                <Typography sx={{ textTransform: "none" }}>Status</Typography>
                                <FormControl fullWidth className='inputField1'>
                                    <Select
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
                                <Typography sx={{ textTransform: "none" }}>Last Activity</Typography>
                                <TextField className='inputField1' fullWidth type='date' value={userFields?.updatedDate || ''} onChange={handleChange} name='updatedDate' />
                            </Grid>
                        </Grid>
                        <Grid container my={3} columnGap={1} >
                            <Button onClick={createUser} sx={{
                                width: "237px",
                                height: "53px",
                                textTransform: "none"
                            }} variant="contained">Create user</Button>
                            <Button onClick={routeChange} sx={{
                                width: "237px",
                                height: "53px",
                                textTransform: "none"
                            }} variant="contained">Cancel</Button>
                        </Grid>
                    </Box>
                </Box>

            </Box>
        </Root >
    )
}


export default AddUser;