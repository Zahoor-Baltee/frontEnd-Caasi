import React, { useEffect, useRef, useState } from 'react';
import { Grid, TextField, Typography, MenuItem, Box, Select, Button, CircularProgress } from '@mui/material';
import { Add } from '@mui/icons-material';
import styled from '@emotion/styled'; // This is correct
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import { startOfMonth, parseISO } from 'date-fns';
import CustomToolbar from '../../Componenets/CustomTolbar';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { UserServices } from '../../Services/User/UserServices';
import AlertSnackbar from '../../Componenets/AlertSnackbar';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCalendarMonth } from "react-icons/md";
import AuthService from '../../Services/AuthServices';
import { AbsenceServices } from '../../Services/Absence/AbsenceServices';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const Root = styled(Grid)(({ theme }) => ({
    "& .MuiSvgIcon-root": {
        color: "#fff"
    },
    "& .mainContainer": {
        padding: "20px",
        backgroundColor: "#FAFBFC",
        display: 'flex',
        flexDirection: 'column',
        // height: '100vh', 
        padding: "30px",
        "& .flexBox": {
            display: 'flex',
            alignItem: "center",
            gap: "10px",
            "& h5": {
                color: "#52a9e1"
            },
            "& .fill": {
                backgroundColor: "#52a9e1",
                "& h5": {
                    color: "#fff"
                },
            },
            "& .dateBox": {
                border: "4px solid #52a9e1",
                borderRadius: "10px",
                padding: "6px 12px",

            },
            "& .startDateEndDate": {
                display: 'flex',
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center", gap: "8px"
            }
        },
        "& .CalendarContainer": {
            width: "100%"
        },
        "& .rbc-button-link": {
            color: "#2086C5",
            fontWeight: "bold",
        },
        "& .toolbarContainer": {
            width: '100%',
            marginBottom: "16px",
        },
        "& .CommentSec": {
            height: "160px",
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "#0075bc",
            border: "1px solid #0075bc",
            borderRadius: "10px",
            width: "95%",
            "& .headerSec": {
                display: "flex",
                justifyContent: "space-between",
                alignItem: "center",
                width: "100%"
            },
            "& .textSec": {

            },
            "& .plusIconSec": {
                padding: "3px",
                border: "1px solid #fff",
                borderRadius: "50%",
                display: "flex",
                alignItem: "center"
            }
        },
        "& .attachmentSec": {
            width: "95%",

            marginTop: "16px",
            padding: "16px",
            display: 'flex',
            justifyContent: 'center',
        },


        '& .menuPopup': {
            border: '1px solid green',
            borderRadius: '5px',
            boxShadow: 0,
        },
        "& .MuiInput-input MuiInputBase-inputMultiline": {
            border: "1px solid green !important",
            color: "#fff"
        },

    }
}));


const NewAbsence = () => {
    const [comments, setComments] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState();
    const [events, setEvents] = useState([]);
    const [formFields, setFormFields] = useState({})
    const [selectedUser, setSelectedUser] = useState({})
    const [selectedMonthForDays, setSelectedMonthForDays] = useState((new Date().getMonth() + 1).toString().padStart(2, '0')); // Default to January
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedDays, setSelectedDays] = useState((new Date().getDate()).toString().padStart(2, '0'));
    const [selectedMonthForDaysE, setSelectedMonthForDaysE] = useState((new Date().getMonth() + 1).toString().padStart(2, '0')); // Default to January
    const [selectedYearE, setSelectedYearE] = useState(new Date().getFullYear());
    const [selectedDaysE, setSelectedDaysE] = useState((new Date().getDate()).toString().padStart(2, '0'));
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [numberOfDays, setNumberOfDays] = useState([]);
    const [endDateForEvent, setEndDateForEvent] = useState(null);
    const [startDateForEvent, setStartDateForEvent] = useState(null);
    const [submitForm, setSubmitForm] = useState(false)


    const [alert, setAlert] = useState({
        alertColor: "primary",
        alertMessage: "",
        isAlertOpen: false,
    });
    const absentDaysTitles = ["Illness", "Medical Appointment", "Unpaid Leave", "Vacation"]
    const months = ['01', "02", '03', "04", '05', "06", '07', "08", '09', "10", '11', "12"]
    const [isLoading, setIsLoading] = useState(false);
    const isAbsense = useRef(false)
    const [selectedAbsence, setSelectedAbsence] = useState("Illness");

    const label = () => {
        if (selectedMonth && date) {
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return `${month} ${year}`;
        }
    };
    const [absences, setAbsences] = useState([]);
    const [yearList, setYearList] = useState([]);
    const [userList, setUserList] = useState([])

    useEffect(() => {
        setFormFields(selectedUser)
    }, [selectedUser])
    useEffect(() => {
        getUserListForDropDown()
    }, [])
    const getUserListForDropDown = async () => {
        let res = await UserServices.getUserDropdown()
        if (res.success) {
            setUserList(res.data)
        }
    }
    React.useEffect(() => {
        const a = new Date();
        const currentMonth = (a.getMonth() + 1).toString().padStart(2, '0'); // Ensures the month is always two digits
        const currentYear = a.getFullYear();

        setSelectedMonth(`${currentYear}-${currentMonth}`);
    }, [])

    // Update days when month or year changes
    useEffect(() => {
        const days = calculateDaysInMonth(selectedMonthForDays, selectedYear);
        setDaysInMonth(days);
        setYearList(generateNext10Years())
    }, [selectedMonthForDays, selectedYear]);
    React.useEffect(() => {
        if (selectedMonth) {
            setDate(startOfMonth(parseISO(selectedMonth)));
        }
    }, [selectedMonth])
    React.useEffect(() => {
        if (date) {

            setAbsences([
                // { date: `31 ${label()}`, status: '' },
                { date: `30 ${label()}`, status: '' },
                { date: `29 ${label()}`, status: '' },
                { date: `28 ${label()}`, status: '' },
                { date: `27 ${label()}`, status: '' },
                { date: `26 ${label()}`, status: '' },
                { date: `25 ${label()}`, status: '' },
                { date: `24 ${label()}`, status: '' },
                { date: `23 ${label()}`, status: '' },
                { date: `22 ${label()}`, status: '' },
                { date: `21 ${label()}`, status: '' },
                { date: `20 ${label()}`, status: '' },
                { date: `19 ${label()}`, status: '' },
                { date: `18 ${label()}`, status: '' },
                { date: `17 ${label()}`, status: '' },
                { date: `16 ${label()}`, status: '' },
                { date: `15 ${label()}`, status: '' },
                { date: `14 ${label()}`, status: '' },
                { date: `13 ${label()}`, status: '' },
                { date: `12 ${label()}`, status: '' },
                { date: `11 ${label()}`, status: '' },
                { date: `10 ${label()}`, status: '' },
                { date: `09 ${label()}`, status: '' },
                { date: `08 ${label()}`, status: '' },
                { date: `07 ${label()}`, status: '' },
                { date: `06 ${label()}`, status: '' },
                { date: `05 ${label()}`, status: '' },
                { date: `04 ${label()}`, status: '' },
                { date: `03 ${label()}`, status: '' },
                { date: `02 ${label()}`, status: '' },
                { date: `01 ${label()}`, status: '' },
            ])
        }
    }, [date])
    useEffect(() => {
        const startDate = `${selectedMonthForDays}-${selectedDays}-${selectedYear}`; // Declare your start date
        const endDate = `${selectedMonthForDaysE}-${selectedDaysE}-${selectedYearE}`;
        setStartDateForEvent(startDate)   // Declare your end date
        setEndDateForEvent(endDate)   // Declare your end date
        const resnumberOfDays = calculateDaysBetweenDates(startDate, endDate);
        setNumberOfDays(resnumberOfDays);
    }, [selectedDays, selectedYear, selectedMonthForDays, selectedDaysE, selectedYearE, selectedMonthForDaysE])
    // Function to calculate days in a month
    const calculateDaysInMonth = (month, year) => {
        const days = new Date(year, month, 0).getDate(); // Gets the number of days in the given month and year
        return Array.from({ length: days }, (_, i) => (i + 1).toString().padStart(2, "0")); // Creates an array from 1 to 'days'
    };
    const generateNext10Years = () => {
        const currentYear = new Date().getFullYear(); // Get the current year
        const years = Array.from({ length: 10 }, (_, i) => currentYear + i); // Generate an array of the next 10 years
        return years;
    };

    const calculateDaysBetweenDates = (startDateStr, endDateStr) => {
        // Convert date strings to Date objects (assuming format is DD-MM-YYYY)
        const [selectedMonthForDays, selectedDays, selectedYear] = startDateStr.split("-").map(Number);
        const [selectedMonthForDaysE, selectedDaysE, selectedYearE] = endDateStr.split("-").map(Number);

        // Create Date objects
        const startDate = new Date(selectedMonthForDays - 1, selectedYear, selectedDays); // Months are 0-indexed
        const endDate = new Date(selectedMonthForDaysE - 1, selectedYearE, selectedDaysE);
        if (startDate > endDate) {
            return 0
        }
        // Calculate the difference in milliseconds
        const diffInMilliseconds = endDate - startDate;

        // Convert milliseconds to days
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        return diffInDays;
    };

    useEffect(() => {
        if (startDateForEvent || endDateForEvent) {
            addAbsentDates(startDateForEvent, endDateForEvent)
        }

    }, [startDateForEvent, endDateForEvent])
    //===================
    const addAbsentDates = (startDate, endDate) => {
        if (startDate && endDate) {
            let newEvents = [];
            let currentDate = new Date(startDate);
            let currentEndDate = new Date(endDate);
            while (currentDate <= currentEndDate) {
                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    newEvents.push({
                        date: new Date(currentDate), // Ensure a new Date object is pushed
                        workType: selectedAbsence,
                        title: selectedAbsence, // Optional: to show a title on the event
                    });
                }
                currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
            }

            setEvents([...events, ...newEvents]);
        }
    };

    //===================


    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };

    // Date Formate
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("-");
        // const months = {
        //     January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
        //     July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        // };
        return new Date(year, month, day);
    };

    const handleMonthChange = (newMonth) => {
        setSelectedMonth(newMonth);
        setDate(startOfMonth(parseISO(newMonth)));
    };

    const handleEmployeeChange = (newEmployee) => {
        setEmployee(newEmployee);
        if (userList.length) {
            let selectedEmpolyee = userList?.filter(e => e._id === newEmployee)
            setSelectedUser(selectedEmpolyee[0])
        }
    };
    const disableWeekends = (date) => {
        const day = date.getDay();
        if (day === 0 || day === 6) {
            return {
                className: 'disabled-day',
                style: {
                    backgroundColor: '#f0f0f0',
                    pointerEvents: 'none',
                    color: '#ccc',
                },
            };
        }
        return {};
    };
    let navigateUser = useNavigate();

    const handleSubmit = async () => {
        setIsLoading(true)
        let data = {
            clientId: AuthService.getUserid(),
            userId: employee,
            dateOfSubmitted: formFields.dateOfSubmission,
            name: selectedUser.firstName,
            lastName: selectedUser.lastName,
            email: selectedUser.email,
            phone: selectedUser.phoneNumber,
            // status: "active",
            selectMonthDropdowns: selectedMonth,
            startDate: startDateForEvent,
            endDate: endDateForEvent,
            totalDays: numberOfDays,
            comments: comments,
            attachments: '',
            days: events,
            reasonOfAbsence: selectedAbsence
        }
        try {
            let res = await AbsenceServices.createAbsence(data)
            setSubmitForm(true)
            if (res.success) {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
                setIsLoading(false)
                setTimeout(() => {
                    navigateUser("/absence")
                }, 2000)
            } else {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }


    return (
        <Root>
            <Box className="mainContainer">
                <Grid container sx={{ backgroundColor: "#fff", borderRadius: "20px", padding: "20px" }}>
                    <Grid item xs={8} md={8}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            spacing: 3,
                        }}
                    >
                        <Box className="CalendarContainer">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="date"
                                endAccessor="date"
                                style={{ height: 650, width: "100%" }}
                                defaultView="month"
                                views={["month"]}
                                date={date}
                                dayPropGetter={disableWeekends}
                                components={{
                                    toolbar: (props) => (
                                        <CustomToolbar
                                            {...props}
                                            date={date}
                                            from='abs'
                                            userList={userList}
                                            selectedMonth={selectedMonth}
                                            employee={employee}
                                            onMonthChange={handleMonthChange}
                                            onEmployeeChange={handleEmployeeChange}
                                            onNavigate={(newDate) => setDate(newDate)}
                                        />
                                    ),
                                }}
                                eventPropGetter={(event) => {
                                    let backgroundColor = "#3174ad"; // Default color
                                    if (event.workType === 'Vacation' || event.workType === 'Unpaid Leave' || event.workType === 'Medical Appointment' || event.workType === 'Illness') backgroundColor = 'red';
                                    return { style: { backgroundColor } };
                                }}
                            />
                        </Box>
                    </Grid>
                    {/* Right Side Grid */}
                    <Grid container flexDirection='column' alignContent='center' justifyContent='space-around' item xs={4} md={4}>
                        <Select
                            fullWidth={true}
                            variant="outlined"
                            margin="dense"
                            value={selectedAbsence}
                            onChange={(e) => setSelectedAbsence(e.target.value)}
                            sx={{
                                mx: 1, width: 300, color: "#fff", backgroundColor: "#D53631", height: "50px",
                                "& fieldset": {
                                    border: "none",
                                },
                            }}
                        >
                            {/* <MenuItem value={"null"}>New Absence</MenuItem> */}
                            {absentDaysTitles.map((el, index) => (
                                <MenuItem key={index} value={el}>{el}</MenuItem>
                            ))}
                        </Select>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Typography sx={{ color: "#52a9e1", fontWeight: "600" }} variant='h5'>Start Date</Typography>
                            <Box className="flexBox">
                                <Box className='startDateEndDate'>
                                    <Select
                                        sx={{
                                            // backgroundColor: "#52A9E1",
                                            color: "#52a9e1",
                                            variant: "h4",
                                            "& .MuiSvgIcon-root": {
                                                display: "none",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "10px", // Apply the border radius to the input root
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "4px solid #52a9e1 !important",
                                            },
                                            "& .MuiSelect-select": {
                                                padding: "15px !important",
                                                fontSize: "30px",
                                                fontWeight: "600",
                                                minHeight: "unset !important",
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 250,
                                                    textAlign: "center",
                                                    '&::-webkit-scrollbar': {
                                                        display: 'none', // Hide the scrollbar
                                                    },
                                                    overflowY: 'auto' // Prevent scrolling
                                                }
                                            }
                                        }}
                                        value={selectedDays}
                                        onChange={(e) => { setSelectedDays(e.target.value) }}                                        >
                                        {daysInMonth.map((el, index) => (
                                            <MenuItem sx={{ "& .MuiButtonBase-root": { justifyContent: "center" } }} key={index} value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }}  >DD</Typography>
                                </Box>
                                <Box className='startDateEndDate'>
                                    <Select
                                        sx={{
                                            backgroundColor: "#52A9E1",
                                            color: "#fff",
                                            variant: "h4",
                                            "& .MuiSvgIcon-root": {
                                                display: "none",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "10px",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none !important",
                                            },
                                            "& .MuiSelect-select": {
                                                padding: "15px !important",
                                                fontSize: "30px",
                                                fontWeight: "600",
                                                minHeight: "unset !important",
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 250,
                                                    textAlign: "center",
                                                    '&::-webkit-scrollbar': {
                                                        display: 'none', // Hide the scrollbar
                                                    },
                                                    overflowY: 'auto' // Prevent scrolling
                                                }
                                            }
                                        }}
                                        value={selectedMonthForDays}
                                        onChange={(e) => { setSelectedMonthForDays(e.target.value) }}
                                    >

                                        {months.map((el, index) => (
                                            <MenuItem key={index} value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }}>MM</Typography>
                                </Box>
                                <Box className='startDateEndDate'>
                                    <Select
                                        sx={{
                                            color: "#52a9e1",
                                            variant: "h4",
                                            "& .MuiSvgIcon-root": {
                                                display: "none",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "10px",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "4px solid #52a9e1 !important",
                                            },
                                            "& .MuiSelect-select": {
                                                padding: "15px !important",
                                                fontSize: "30px",
                                                fontWeight: "600",
                                                minHeight: "unset !important",
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 250,
                                                    textAlign: "center",
                                                    '&::-webkit-scrollbar': {
                                                        display: 'none', // Hide the scrollbar
                                                    },
                                                    overflowY: 'auto' // Prevent scrolling
                                                }
                                            }
                                        }}
                                        value={selectedYear}
                                        onChange={(e) => { setSelectedYear(e.target.value) }}
                                    >

                                        {yearList.map((el, index) => (
                                            <MenuItem key={index} value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >YYYY</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Typography sx={{ color: "#52a9e1", fontWeight: "600" }} fontWeight="600" variant='h5'>End Date</Typography>
                            <Box className="flexBox">
                                <Box className='startDateEndDate'>
                                    <Select
                                        sx={{
                                            color: "#52A9E1",
                                            variant: "h4",
                                            "& .MuiSvgIcon-root": {
                                                display: "none",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "10px",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "4px solid #52a9e1 !important",
                                            },
                                            "& .MuiSelect-select": {
                                                padding: "15px !important",
                                                fontSize: "30px",
                                                fontWeight: "600",
                                                minHeight: "unset !important",
                                            },

                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 250,
                                                    textAlign: "center",
                                                    '&::-webkit-scrollbar': {
                                                        display: 'none', // Hide the scrollbar
                                                    },
                                                    overflowY: 'auto' // Prevent scrolling
                                                }
                                            }
                                        }}
                                        value={selectedDaysE}
                                        onChange={(e) => { setSelectedDaysE(e.target.value) }}
                                    >
                                        {daysInMonth.map((el, index) => (
                                            <MenuItem key={index} value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >DD</Typography>
                                </Box>
                                <Box className='startDateEndDate'>
                                    <Select
                                        sx={{
                                            backgroundColor: "#52A9E1",
                                            color: "#fff",
                                            variant: "h4",
                                            "& .MuiSvgIcon-root": {
                                                display: "none",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "10px",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "none !important",
                                            },
                                            "& .MuiSelect-select": {
                                                padding: "15px !important",
                                                fontSize: "30px",
                                                fontWeight: "600",
                                                minHeight: "unset !important",
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 250,
                                                    textAlign: "center",
                                                    '&::-webkit-scrollbar': {
                                                        display: 'none', // Hide the scrollbar
                                                    },
                                                    overflowY: 'auto' // Prevent scrolling
                                                }
                                            }
                                        }}
                                        value={selectedMonthForDaysE}
                                        onChange={(e) => { setSelectedMonthForDaysE(e.target.value) }}
                                    >

                                        {months.map((el, index) => (
                                            <MenuItem key={index} value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >MM</Typography>
                                </Box>
                                <Box className='startDateEndDate'>
                                    <Select
                                        sx={{
                                            color: "#52A9E1",
                                            variant: "h4",
                                            "& .MuiSvgIcon-root": {
                                                display: "none",
                                            },
                                            "& .MuiOutlinedInput-root": {
                                                borderRadius: "10px",
                                            },
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: "4px solid #52a9e1 !important",
                                            },
                                            "& .MuiSelect-select": {
                                                padding: "15px !important",
                                                fontSize: "30px",
                                                fontWeight: "600",
                                                minHeight: "unset !important",
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    maxHeight: 250,
                                                    textAlign: "center",
                                                    '&::-webkit-scrollbar': {
                                                        display: 'none', // Hide the scrollbar
                                                    },
                                                    overflowY: 'auto', // Prevent scrolling
                                                }
                                            },
                                        }}
                                        value={selectedYearE}
                                        onChange={(e) => { setSelectedYearE(e.target.value) }}
                                    >
                                        {yearList.map((el, index) => (
                                            <MenuItem key={index} value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >YYYY</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Typography sx={{ color: "#52a9e1", fontWeight: "600" }} variant='h5'>Total Days</Typography>
                            < Box className="flexBox" >
                                <Box>
                                    <Box style={{ borderRadius: "10px", backgroundColor: "#CFE9F7", padding: "5px 10px", }}>
                                        <MdOutlineCalendarMonth style={{ fontSize: "35px", color: "#088ADD" }} />
                                    </Box>
                                </Box>
                                <Box>
                                    <Box style={{ borderRadius: "10px", backgroundColor: "#CFE9F7", color: '#fff', padding: "10px 16px", }}>
                                        <Typography fontWeight="600" variant='h5'>{numberOfDays}</Typography>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        {/* Comments Section */}
                        <Box className="CommentSec">
                            <Box className="headerSec">
                                <Typography variant="h6" sx={{ color: "#fff" }}>Comments</Typography>
                                <Box className="plusIconSec">
                                    <Add size={12} sx={{ color: "#fff" }} />
                                </Box>
                            </Box>
                            <Box className="textSec">
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    variant="standard"
                                    value={comments}
                                    onChange={handleCommentsChange}
                                    margin="dense"
                                    InputProps={{
                                        sx: {
                                            color: "#fff",
                                            borderBottom: "1px solid #fff",
                                        },
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid container gap='10px' justifyContent='end' item xs={6}>
                        {/* Attachment Section */}
                        <Box className="CommentSec">
                            <Box className="headerSec">
                                <Typography variant="h6" sx={{ color: "#fff" }}>Attachment</Typography>
                                <Box className="plusIconSec">
                                    <Add size={12} sx={{ color: "#fff" }} />
                                </Box>
                            </Box>
                            <Box justifyContent="center" sx={{ display: "flex", gap: 1 }}>
                                <Box >
                                    <ContentPasteIcon style={{ color: "#fff", padding: "5px", fontSize: 60, textAlign: "center" }} />
                                </Box>
                                <Box >
                                    <TextSnippetIcon style={{ color: "#fff", padding: "5px", fontSize: 60, textAlign: "center" }} />
                                </Box>

                            </Box>

                        </Box>
                        <Button sx={{ width: '95%', height: "60px" }} startIcon={isLoading ? <CircularProgress sx={{ color: "#fff" }} /> : ""} onClick={handleSubmit} variant="contained" >
                            Submit
                        </Button>
                    </Grid>


                </Grid>
                {/* Snackbar */}
                <Box>
                    <AlertSnackbar alert={alert} setAlert={setAlert} />
                </Box>
            </Box>
        </Root >

    );
};

export default NewAbsence;
