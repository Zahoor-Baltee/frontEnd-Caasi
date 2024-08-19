import React, { useEffect, useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    MenuItem,
    Grid,
    Box,
    Select,
    Input,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    FormControl,
} from '@mui/material';
import { styled } from '@mui/system';
import QrScanner from 'react-qr-scanner'; // Updated QR code scanner library
import { ExpenseService } from '../../Services/Expense/ExpenseService';
import { UserServices } from '../../Services/User/UserServices';
import AuthService from '../../Services/AuthServices';
import AlertSnackbar from '../../Componenets/AlertSnackbar';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { ImAttachment } from "react-icons/im";
import { RiQrScan2Line } from "react-icons/ri";

const Root = styled(Box)({
    margin: 0,
    padding: 0,
    "& .MuiInputBase-root": {
        border: "none"
    },
    "& .MuiFormControl-root": {
        marginBottom: "0px"
    }
});

const ExpenseReportForm = ({ open, setOpen }) => {
    const [formFields, setFormFields] = useState({
        userName: "",
        category: ""
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUser] = useState([]);
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [alert, setAlert] = useState({
        alertColor: "primary",
        alertMessage: "",
        isAlertOpen: false,
    });

    useEffect(() => {
        getUserList()
    }, [])

    const handleChange = (event) => {
        setFormFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };



    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const fileData = {
                name: selectedFile.name,
                size: selectedFile.size,
                type: selectedFile.type,
                lastModified: selectedFile.lastModified,
            };
            setFile(JSON.stringify(fileData));
        }
    };

    const handleOpenScanner = () => {
        setIsScannerOpen(true);
    };

    const handleCloseScanner = () => {
        setIsScannerOpen(false);
    };

    const handleScan = (data) => {
        if (data) {
            // Process scanned data
            console.log(data);
            handleCloseScanner();
        }
    };

    const handleError = (error) => {
        console.error(error);
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

    const handleSubmit = async () => {
        setIsSubmit(true)
        if (!formFields?.userName || !formFields?.category || !formFields?.amount || !formFields?.dateOfSubmitted || !formFields?.description) {
            return
        }
        try {
            let clientData = AuthService.getUserData()
            let data = formFields;
            data.attachment = file;
            data.clientId = clientData.clientId
            data.userId = clientData._id;
            data.scan = "https://example.com";
            // debugger
            let res = await ExpenseService.createExpense(data)
            if (res.success) {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
                setTimeout(() => {
                    setOpen(false);
                }, 3000)
            } else {

            }
        } catch (error) {

        }
    }
    let navigate = useNavigate();

    const handleClick = () => {
        console.log('Navigating to /expense-list');
        navigate('/expense-list');
    };


    return (
        <Root>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "10px"
                }}>
                <IoIosArrowDropleftCircle onClick={handleClick} style={{ fontSize: "30px", color: "#0073BC" }} />
                <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>Enter expense report</Typography>
            </Box>
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
                        // marginBottom: '16px',
                        backgroundColor: "#d5dce4",
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                    displayEmpty
                    onChange={handleChange}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                // padding: '5px 8px',
                                '& .MuiMenuItem-root': {
                                    // padding: '5px 8px',
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value="">Select User</MenuItem>
                    {user?.map((el, index) => (
                        <MenuItem key={index} value={`${el.firstName}${el.lastName}`}>{el.firstName}{el.lastName}</MenuItem>
                    ))}
                </Select>
                {!formFields.userName && isSubmit ? <Typography sx={{ color: "red", fontSize: "10px" }}>User Name is required</Typography> : ""}
            </FormControl>
            <FormControl sx={{
                "& .MuiInputBase-root": {
                    marginTop: "16px"
                }
            }} fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name='category'
                    fullWidth
                    value={formFields?.category}
                    error={!formFields?.category && isSubmit}
                    size="small"
                    sx={{
                        padding: '4px 8px',
                        backgroundColor: "#d5dce4",
                        borderRadius: "8px",
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',
                        },
                    }}
                    displayEmpty
                    onChange={handleChange}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                padding: '5px 8px',
                                '& .MuiMenuItem-root': {
                                    padding: '4px 8px',
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value="">Select a Category</MenuItem>
                    <MenuItem value={"Developer"}>Developer</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                {!formFields.category && isSubmit ? <Typography sx={{ color: "red", fontSize: "10px" }}>Category is required</Typography> : ""}

            </FormControl>
            <FormControl fullWidth>
                <TextField
                    sx={{
                        backgroundColor: "#d5dce4",
                        borderRadius: "8px",
                        padding: '4px 8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                                padding: '4px 8px',
                            },
                        },
                    }}
                    fullWidth
                    size="small"
                    placeholder="$ Enter Amount"
                    name="amount"
                    type="number"
                    error={!formFields?.amount && isSubmit}
                    onChange={handleChange}
                    value={formFields?.amount}
                    margin="normal"
                    variant="outlined"
                />
                {!formFields.amount && isSubmit ? <Typography sx={{ color: "red", fontSize: "10px" }}> Amount is required</Typography> : ""}
            </FormControl>
            <FormControl fullWidth>
                <TextField
                    sx={{
                        backgroundColor: "#d5dce4",
                        borderRadius: "8px",
                        padding: '4px 8px',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                                padding: '4px 8px',
                            },
                        },
                    }}
                    fullWidth
                    size="small"
                    margin="normal"
                    variant="outlined"
                    type="date"
                    onChange={handleChange}
                    name="dateOfSubmitted"
                    placeholder="Enter Date"
                    error={!formFields?.dateOfSubmitted && isSubmit}
                    value={formFields?.dateOfSubmitted}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {!formFields.dateOfSubmitted && isSubmit ? <Typography sx={{ color: "red", fontSize: "10px" }}> Submitted is required</Typography> : ""}

            </FormControl>
            <FormControl fullWidth>
                <TextField
                    sx={{
                        backgroundColor: "#d5dce4",
                        borderRadius: "8px",
                        height: "100px",

                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: 'none',
                                padding: '4px 8px',
                            },
                        },
                    }}
                    fullWidth
                    placeholder="Add a description"
                    size="small"
                    margin="normal"
                    name="description"
                    onChange={handleChange}
                    error={!formFields?.description && isSubmit}
                    value={formFields?.description}
                    variant="outlined"
                    multiline
                    rows={2}

                />
                {!formFields.description && isSubmit ? <Typography sx={{ color: "red", fontSize: "10px" }}> Description is required</Typography> : ""}
            </FormControl>

            <Box sx={{ mt: 2, mb: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <label htmlFor="file-upload">
                            <Input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <IconButton sx={{ borderRadius: "0px", }}>
                                <Box
                                    sx={{
                                        border: "3px solid #6CBCDF",
                                        display: "flex", justifyContent: "center",
                                        alignItems: "center", height: "60px",
                                        width: "60px",
                                        backgroundColor: "#0073BC",
                                        borderRadius: "50px"
                                    }}>
                                    <ImAttachment style={{ color: "white", fontSize: "30px", }} />
                                </Box>
                                <Typography sx={{ color: "#737791", fontSize: "22px", marginLeft: "5px" }}> Attach a document</Typography>
                            </IconButton>

                        </label>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton sx={{ borderRadius: "0px" }} onClick={handleOpenScanner}>
                            <RiQrScan2Line style={{ color: "#0073BC", fontSize: "60px" }} />
                            <Typography sx={{ color: "#737791", fontSize: "22px", marginLeft: "5px" }}> Scan your report</Typography>
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" >Reset</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>

            <Box>
                <AlertSnackbar alert={alert} setAlert={setAlert} />
            </Box>

            <Dialog open={isScannerOpen} onClose={handleCloseScanner}>
                <DialogTitle>Scan QR Code</DialogTitle>
                <DialogContent>
                    <QrScanner
                        onScan={handleScan}
                        onError={handleError}
                        style={{ width: '100%' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseScanner} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Root>
    );
};

export default ExpenseReportForm;
