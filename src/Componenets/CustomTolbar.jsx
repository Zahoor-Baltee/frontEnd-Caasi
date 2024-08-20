import React from 'react';
import { IconButton, Typography, Grid, TextField, MenuItem, Box, Select, Button } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { addMonths } from 'date-fns';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CustomToolbar = ({ date, onMonthChange, selectedMonth, employee, onEmployeeChange, onNavigate }) => {
    const handleMonthChange = (event) => {
        const month = event.target.value;
        onMonthChange(month);
    };

    const handleEmployeeChange = (event) => {
        onEmployeeChange(event.target.value);
    };

    const goToBack = () => {
        // Calculate the new date for the previous month
        const newDate = addMonths(date, -1);
        onNavigate(newDate);  // Update the date
    };

    const goToNext = () => {
        // Calculate the new date for the next month
        const newDate = addMonths(date, 1);
        onNavigate(newDate);  // Update the date
    };

    const label = () => {
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    };

    return (
        <Grid container alignItems="center" justifyContent="space-between" spacing={2} marginBottom={1} marginTop={1}>
            <Grid md={12}>
                <Typography sx={{ fontWeight: "bold" }} variant="h5" textAlign={"center"}>Adding a new activity report</Typography>
            </Grid>

            <Grid md={2} item sx={{ display: 'flex', alignItems: "center", gap: 1 }}>
                <Box onClick={goToBack} sx={{ backgroundColor: "#0075bc", display: "flex", alignItems: "center", }}>
                    <ArrowLeftIcon style={{ color: "#fff", padding: "5px", fontSize: 30 }} />
                </Box>
                <Box onClick={goToNext} sx={{ backgroundColor: "#0075bc", display: "flex", alignItems: "center" }}>
                    <ArrowRightIcon style={{ color: "#fff", padding: "5px", fontSize: 30 }} />
                </Box>
            </Grid>

            <Grid item md={3}>
                <Typography sx={{ textAlign: "center" }} variant="h6">{label()}</Typography>
            </Grid>
            <Grid item md={7} sx={{ display: "flex", justifyContent: "end", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
                {/* <Select
                    displayEmpty
                    fullWidth={true}
                    value={employee}
                    onChange={handleEmployeeChange}

                    variant="outlined"
                    margin="dense"
                    sx={{ mx: 1, width: 300, color: "#fff", backgroundColor: "#2f80ed", marginRight: "0px !important", display: "flex", alignItems: "center", height: "50px" }}
                >
                    <MenuItem value="">
                        <AccountCircleIcon />
                        Select Employee
                    </MenuItem>
                    <MenuItem value="Employee 1">Employee 1</MenuItem>
                    <MenuItem value="Employee 2">Employee 2</MenuItem>
                </Select>
                <Select
                    fullWidth={true}
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    variant="outlined"
                    margin="dense"
                    sx={{ mx: 1, width: 300, color: "#fff", backgroundColor: "#2f80ed", height: "50px" }}
                >
                    <MenuItem value="">Select Month</MenuItem>
                    <MenuItem value="2024-05">May 2024</MenuItem>
                    <MenuItem value="2024-06">June 2024</MenuItem>
                </Select> */}
                <Button sx={{ backgroundColor: "#2F80ED", textTransform: "none" }} variant="contained" size="large">
                    <AccountCircleIcon sx={{ fontSize: "25px", marginRight: "5px" }} />
                    <Typography>Select Employee</Typography>
                </Button>
                <Button sx={{ backgroundColor: "#2F80ED", textTransform: "none" }} variant="contained" size="large">
                    Select Month
                </Button>

            </Grid>
        </Grid>
    );
};

export default CustomToolbar;
