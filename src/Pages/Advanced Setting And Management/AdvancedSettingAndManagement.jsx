import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { RiDeleteBin6Line } from "react-icons/ri";
import logo from '../../Assets/cassilogo.png'
import { MuiColorInput } from 'mui-color-input'
import { LuPenSquare } from "react-icons/lu";
import { AdvancedSettingServices } from '../../Services/AdvanceSetting/AdvanceSetting';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import AuthService from '../../Services/AuthServices';
import { UserServices } from '../../Services/User/UserServices';

const Root = styled(Box)(({ theme }) => ({
    margin: 0,
    padding: 0,
    "& .mainContainer": {
        padding: "20px",
        backgroundColor: "#f4f7fe",
        "& .label-po": {
            fontWeight: "600",
            textTransform: "none"
        }
    }
}));
const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#1890ff',
                ...theme.applyStyles('dark', {
                    backgroundColor: '#177ddc',
                }),
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor: 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
        ...theme.applyStyles('dark', {
            backgroundColor: 'rgba(255,255,255,.35)',
        }),
    },
}));

export default function AdvancedSettingAndManagement() {
    const [userFields, setUserFields] = useState({});
    const [alert, setAlert] = useState({
        alertColor: "primary",
        alertMessage: "",
        isAlertOpen: false,
    });
    const [formFields, setFormFields] = useState({
        userName: "",
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState([]);

    const [colorValue, setColorValue] = useState('#ffffff');
    const [value, setValue] = useState('1');

    const [editStates, setEditStates] = useState({
        team: false,
        department: false,
        roles: false,
    });
    useEffect(() => {
        getUserList()
    }, [])
    const handleColorChange = (newValue) => {
        setColorValue(newValue);
    };

    const handleChange = (e, newValue) => {
        e.preventDefault();
        setValue(newValue);
    };
    const handleSelectUser = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };
    const handleEditToggle = (field) => {
        setEditStates((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };
    const getUserList = async () => {
        try {
            let res = await UserServices.getlist()
            if (res.success) {
                setUser(res.data)
            } else {
                // alert("failed")
            }

        } catch (error) {
            console.error(error)
        }
    }
    const deleteUser = async () => {
        try {
            const userid = AuthService.getUserid()
            let res = await UserServices.deleteUser(userid)
            if (res.success) {
                console.log('user delete successfully');
            }
        } catch (error) {
            console.log(error);

        }
    }
    const handleSubmit = async () => {
        setIsSubmit(true)
        if (!userFields?.team || !userFields?.department || !userFields?.roles) {
            return
        }
        try {
            let userId = AuthService.getUserid()
            let res = await AdvancedSettingServices.createAdvanceSettings(userFields);
            if (res.success) {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
                setEditStates({ team: false, department: false, roles: false });
            } else {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "error", alertMessage: res.error });
            }
        } catch (error) {
            console.error(error);
            setAlert({ ...alert, isAlertOpen: true, alertColor: "error", alertMessage: "An error occurred." });
        }
    };
    return (
        <Root>
            <Box className='mainContainer'>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography sx={{ fontWeight: "bold" }}>Advanced Setting and Management</Typography>
                    <Box sx={{ display: "flex", gap: "15px" }}>
                        <Button variant="text" >Cancel</Button>
                        <Button variant="contained" onClick={handleSubmit}>Save</Button>
                    </Box>
                </Box>
                <Box>
                    <Box sx={{ width: '100%' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab className='label-po' label="General" value="1" />
                                    <Tab className='label-po' label="Activity Report" value="2" />
                                    <Tab className='label-po' label="Expense Report" value="3" />
                                    <Tab className='label-po' label="Notifications" value="4" />
                                </TabList>
                            </Box>
                            <TabPanel sx={{ display: "flex", flexDirection: "column", gap: "20px" }} value="1">
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            fullWidth
                                            value={formFields?.userName}
                                            error={!formFields.userName && isSubmit}
                                            name="userName"
                                            size="small"
                                            sx={{
                                                padding: '5px 8px',
                                                borderRadius: "8px",
                                                textAlign: "start",
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none',
                                                },
                                            }}
                                            displayEmpty
                                            MenuProps={{ PaperProps: { sx: { maxHeight: 260 } } }}

                                        // onChange={handleSelectUser}
                                        >
                                            <MenuItem value="">Select User</MenuItem>
                                            {user?.map((el, index) => (
                                                <MenuItem key={index} value={`${el.firstName}${el.lastName}`}>{el.firstName}{el.lastName}</MenuItem>
                                            ))}
                                        </Select>
                                        {!formFields.userName && isSubmit ? <Typography sx={{ marginLeft: "15px", color: "red", fontSize: "10px" }}>User Name is required</Typography> : ""}
                                    </FormControl>
                                </Box>
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "5px", alignItems: "center" }}>
                                        <Box sx={{ width: "100%" }}>
                                            <Typography sx={{ fontWeight: "600" }}>Create Teams</Typography>
                                            {editStates.team ? (
                                                <TextField
                                                    className='inputField1'
                                                    value={userFields.team || ""}
                                                    onChange={(e) => setUserFields({ ...userFields, team: e.target.value })}
                                                    fullWidth
                                                    variant="standard"
                                                    InputProps={{ disableUnderline: true }}
                                                    sx={{ '& .MuiInputBase-root': { borderRadius: "10px", height: '40px', backgroundColor: "#fff", border: 'none', padding: "10px 10px" } }}
                                                />
                                            ) : (
                                                <Typography className='lastName' sx={{ height: '40px', color: "#959595", textTransform: "none" }}>
                                                    {userFields.team || "Development team"}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box>
                                            <LuPenSquare onClick={() => handleEditToggle('team')} style={{ cursor: "pointer", color: "#0171BC", fontSize: "20px" }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: "5px", alignItems: "center" }}>
                                        <Box sx={{ width: "100%" }}>
                                            <Typography sx={{ fontWeight: "600" }}>Create Department</Typography>
                                            {editStates.department ? (
                                                <TextField
                                                    className='inputField1'
                                                    value={userFields.department || ""}
                                                    onChange={(e) => setUserFields({ ...userFields, department: e.target.value })}
                                                    fullWidth
                                                    variant="standard"
                                                    InputProps={{ disableUnderline: true }}
                                                    sx={{ '& .MuiInputBase-root': { borderRadius: "10px", height: '40px', backgroundColor: "#fff", border: 'none', padding: "10px 10px" } }}
                                                />
                                            ) : (
                                                <Typography className='lastName' sx={{ height: '40px', color: "#959595", textTransform: "none" }}>
                                                    {userFields.department || "Development department"}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box>
                                            <LuPenSquare onClick={() => handleEditToggle('department')} style={{ cursor: "pointer", color: "#0171BC", fontSize: "20px" }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <Box sx={{ display: "flex", gap: "5px", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box sx={{ width: "100%" }}>
                                            <Typography sx={{ fontWeight: "600" }}>Create Roles</Typography>
                                            {editStates.roles ? (
                                                <TextField
                                                    className='inputField1'
                                                    value={userFields.roles || ""}
                                                    onChange={(e) => setUserFields({ ...userFields, roles: e.target.value })}
                                                    fullWidth
                                                    variant="standard"
                                                    InputProps={{ disableUnderline: true }}
                                                    sx={{ '& .MuiInputBase-root': { borderRadius: "10px", height: '40px', backgroundColor: "#fff", border: 'none', padding: "10px 10px" } }}
                                                />
                                            ) : (
                                                <Typography className='lastName' sx={{ height: '40px', color: "#959595", textTransform: "none" }}>
                                                    {userFields.roles || "Development roles"}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box>
                                            <LuPenSquare onClick={() => handleEditToggle('roles')} style={{ cursor: "pointer", color: "#0171BC", fontSize: "20px" }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <Box sx={{ display: "flex", paddingBottom: "20px !important", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box>
                                            <Typography sx={{ fontWeight: "600" }}>Activity Reports</Typography>
                                        </Box>
                                        <FormGroup>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            </Stack>
                                        </FormGroup>
                                    </Box>
                                </Box>
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px !important", alignItems: "center" }}>
                                        <Box>
                                            <Typography sx={{ fontWeight: "600" }}>Expense Reports</Typography>
                                        </Box>
                                        <FormGroup>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            </Stack>
                                        </FormGroup>
                                    </Box>
                                </Box>
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px !important", alignItems: "center" }}>
                                        <Box>
                                            <Typography sx={{ fontWeight: "600" }}>configure all the categories for activity reports </Typography>
                                        </Box>
                                        <FormGroup>
                                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                                <AntSwitch sx={{ fontSize: "25px" }} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                            </Stack>
                                        </FormGroup>
                                    </Box>
                                </Box>
                                <Box sx={{ borderBottom: 3, borderColor: 'divider' }}>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box sx={{ width: "100%" }}>
                                            <FormControl fullWidth>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    fullWidth
                                                    value={formFields?.userName}
                                                    error={!formFields.userName && isSubmit}
                                                    name="userName"
                                                    size="small"
                                                    sx={{
                                                        padding: '5px 8px',
                                                        borderRadius: "8px",
                                                        textAlign: "start",
                                                        '& .MuiOutlinedInput-notchedOutline': {
                                                            border: 'none',
                                                        },
                                                        '& .MuiSelect-icon': {
                                                            display: 'none', // Hide the icon
                                                        },
                                                    }}
                                                    displayEmpty
                                                    MenuProps={{ PaperProps: { sx: { maxHeight: 260 } } }}

                                                    onChange={handleSelectUser}
                                                >
                                                    <MenuItem sx={{ fontWeight: "600" }} value="">Delete User</MenuItem>
                                                    {user?.map((el, index) => (
                                                        <MenuItem key={index} value={`${el.firstName}${el.lastName}`}>{el.fullName}</MenuItem>
                                                    ))}
                                                </Select>
                                                {!formFields.userName && isSubmit ? <Typography sx={{ marginLeft: "15px", color: "red", fontSize: "10px" }}>User Name is required</Typography> : ""}
                                            </FormControl>
                                        </Box>
                                        <Box>
                                            <RiDeleteBin6Line onClick={deleteUser} style={{ cursor: "pointer", color: "#0171BC", fontSize: "20px" }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                                    <Box>
                                        <Typography variant='h6' fontWeight='bold'>Logo</Typography>
                                        <Box sx={{ height: "200px", width: "250px" }}>
                                            <img src={logo} height='100%' width='100%' alt="" />
                                        </Box>
                                        <Box>
                                            <Button size="large">Remove</Button>
                                            <Button size="large" variant="contained">Change Logo</Button>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant='h6' fontWeight='bold'>Login Screen Logo</Typography>
                                        <Box sx={{ height: "200px", width: "250px" }}>
                                            <img src={logo} height='100%' width='100%' alt="" />
                                        </Box>
                                        <Box>
                                            <Button size="large">Remove</Button>
                                            <Button size="large" variant="contained">Change Logo</Button>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant='h6' fontWeight='bold'>Background Color</Typography>
                                        <MuiColorInput format="hex" value={colorValue} onChange={handleColorChange} />
                                    </Box>
                                </Box>
                            </TabPanel>
                            <TabPanel value="2">Activity Report</TabPanel>
                            <TabPanel value="3">Expense Report</TabPanel>
                            <TabPanel value="4">Notifications</TabPanel>
                        </TabContext>
                    </Box>
                </Box>

            </Box>
        </Root >
    );
}
