import React, { useState } from 'react';
import {
    Container,
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
} from '@mui/material';
import { AttachFile, QrCodeScanner } from '@mui/icons-material';
import { styled } from '@mui/system';
import QrScanner from 'react-qr-scanner'; // Updated QR code scanner library
import { ExpenseService } from '../../Services/Expense/ExpenseService';

const Root = styled(Box)({
    margin: 0,
    padding: 0,
});

const ExpenseReportForm = () => {
    const [formFields, setFormFields] = useState({});
    const [userName, setUserName] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleChange = (event) => {
        setFormFields((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleChangeUser = (event) => {
        setUserName(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
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

    const handleSubmit = async () => {
        try {
            let data = formFields;
            data.attachment = file
            data.scan = "https://example.com"
            debugger
            let res = await ExpenseService.createExpense(data)
            if (res.issussess) {

            } else {

            }
        } catch (error) {

        }
    }

    return (
        <Root>
            <Typography variant="h6" gutterBottom>
                Enter expense report
            </Typography>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userName}
                size="small"
                style={{ padding: '1px 8px', marginBottom: '10px' }}
                fullWidth
                displayEmpty
                onChange={handleChangeUser}
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
                <MenuItem value="">Select User</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                size="small"
                style={{ padding: '1px 8px' }}
                fullWidth
                displayEmpty
                onChange={handleChangeCategory}
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
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

            <TextField
                fullWidth
                size="small"
                placeholder="$ Enter Amount"
                name="amount"
                type="number"
                onChange={handleChange}
                value={formFields?.amount}
                margin="normal"
                variant="outlined"
            />

            <TextField
                fullWidth
                size="small"
                margin="normal"
                variant="outlined"
                type="date"
                onChange={handleChange}
                name="dateOfSubmitted"
                placeholder="Enter Date"
                value={formFields?.dateOfSubmitted}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                fullWidth
                label="Add a description"
                size="small"
                margin="normal"
                name="description"
                onChange={handleChange}
                value={formFields?.description}
                variant="outlined"
                multiline
                rows={2}
            />

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
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<AttachFile />}
                                component="span"
                            >
                                Attach a document
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<QrCodeScanner />}
                            onClick={handleOpenScanner}
                        >
                            Scan your report
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined">Reset</Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
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
