import React from 'react';
import { Typography, Grid, MenuItem, Box, Select, } from '@mui/material';
import { addMonths } from 'date-fns';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import styled from '@emotion/styled'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Root = styled(Grid)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        color: "#fff"
    }
}));
const CustomToolbar = ({ date, onMonthChange, selectedMonth, employee, onEmployeeChange, onNavigate, userList, from = 'act' }) => {
    const months = [
        { id: "01", name: "January" },
        { id: "02", name: "February" },
        { id: "03", name: "March" },
        { id: "04", name: "April" },
        { id: "05", name: "May" },
        { id: "06", name: "June" },
        { id: "07", name: "July" },
        { id: "08", name: "August" },
        { id: "09", name: "September" },
        { id: "10", name: "October" },
        { id: "11", name: "November" },
        { id: "12", name: "December" }
    ];
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
        if (date) {
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return `${month} ${year}`;
        }
    };

    return (
        <Root container alignItems="center" justifyContent="space-between" spacing={2} marginBottom={1} marginTop={1}>
            <Grid md={12}>
                {from === 'act' && <Typography sx={{ fontWeight: "bold" }} variant="h5" textAlign={"center"}>Adding a new activity report</Typography>}
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
                <Typography sx={{ fontWeight: "600", fontSize: "24px", textAlign: "center" }} >{label()}</Typography>
            </Grid>
            <Grid item md={7} sx={{ display: "flex", justifyContent: "end", gap: "10px", alignItems: "center", marginBottom: "5px" }}>
                <Select
                    displayEmpty
                    fullWidth={true}
                    value={employee}
                    onChange={handleEmployeeChange}
                    variant="outlined"
                    margin="dense"
                    sx={{ mx: 1, width: 300, color: "#fff", backgroundColor: "#2f80ed", marginRight: "0px !important", "& .MuiSelect-select": { display: "flex", alignItems: "center", gap: 1 }, height: "50px" }}
                >
                    <MenuItem sx={{ display: "flex", alignItems: "center", gap: 2 }} value="">
                        <AccountCircleIcon />
                        <Typography>Select Employee</Typography>
                    </MenuItem>
                    {userList?.map((el, ind) => (
                        <MenuItem key={ind} value={el._id}>{el.firstName} {el.lastName}</MenuItem>
                    ))}

                </Select>
                {from === 'act' && <Select

                    fullWidth={true}
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    variant="outlined"
                    margin="dense"
                    sx={{
                        mx: 1, width: 300, color: "#fff", backgroundColor: "#2f80ed", height: "50px",
                    }}
                >
                    {months?.map((el, ind) => (
                        <MenuItem key={ind} value={"2024-" + el.id}>{el.name}</MenuItem>
                    ))}
                </Select>}

            </Grid>
        </Root>
    );
};

export default CustomToolbar;
