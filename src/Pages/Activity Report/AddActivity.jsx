import React, { useEffect, useRef, useState } from 'react';
import { Container, Grid, TextField, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, MenuItem, Box, Menu, IconButton, Button, Paper, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import { CheckCircle, Cancel, Add, AttachFile } from '@mui/icons-material';
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
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TrainIcon from '@mui/icons-material/Train';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import { UserServices } from '../../Services/User/UserServices';
import AuthService from '../../Services/AuthServices';
import { ActivityService } from '../../Services/Activity/ActivityServices';
import AlertSnackbar from '../../Componenets/AlertSnackbar';
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
    "& .mainContainer": {
        padding: "20px",
        backgroundColor: "#FAFBFC",
        display: 'flex',
        flexDirection: 'column',
        // height: '100vh', 
        padding: "30px",
        "& .gridpo": {
            "& .CalendarContainer": {
                width: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                padding: "5px 20px 20px 20px",
                borderRadius: "20px",
            },
            "& .rbc-button-link": {
                color: "#2086C5",
                fontWeight: "bold",
            }
        },
        "& .toolbarContainer": {
            width: '100%',
            marginBottom: "16px",
        },
        "& .CommentSec": {
            marginTop: "16px",
            padding: "16px",
            backgroundColor: "#0075bc",
            border: "1px solid #0075bc",
            borderRadius: "10px",
            width: "80%",
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
            marginTop: "16px",
            padding: "16px",
            display: 'flex',
            justifyContent: 'center',
        },
        "& .activityList": {
            marginTop: "16px",
            padding: "16px",
            // maxHeight: '100vh',
            overflow: 'auto',
        },
        "& .rbc-event": {
            // marginTop: "16px",
            alignSelf: "flex-end",
            backgroundColor: "red"
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
        "& .formSec": {
            display: 'flex',
            flexDirection: 'column',
            width: "100%",
            // boxShadow: "1px 2px 14px 1px rgba(0, 0, 0, 0.19)",
            // marginTop: "20px",
            // marginLeft: "5px",

            "& .formSection": {
                padding: "20px",
                backgroundColor: "#fff",
                marginBottom: "20px",
                borderRadius: "10px",

            },
            "& .textField": {
                marginBottom: "8px",

                "& .input": {
                    border: "none",
                    backgroundColor: "#f0faff"
                }
            },
            "& .accordion": {
                marginBottom: "16px",
                boxShadow: "none !important",
            },
            "& .accordionSummary": {
                display: 'flex',
                justifyContent: 'space-between',
                width: "100%",
                alignItems: 'center',
            },
            "& .workdayList": {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid blue",
                borderRadius: "5px",
                padding: "10px 20px",
                marginBottom: "10px",
                "& .workText": {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }
            },
            "& .icon": {
                marginRight: "8px",
                fontWeight: "bold", color: "#2086C5",
            },
        }
    }
}));


const AddActivityReport = () => {
    const [comments, setComments] = useState('');
    const [anchorEl, setAnchorEl] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState();
    const [events, setEvents] = useState([]);
    const [visibleItems, setVisibleItems] = useState(10);
    const [curActivityDate, setCurActivityDate] = useState('')
    const [isSaved, setIsSaved] = useState(false)
    const [submitForm, setSubmitForm] = useState(false)
    const [formFields, setFormFields] = useState({})
    const [selectedUser, setSelectedUser] = useState({})
    const [activityCount, setActivityCount] = useState({})
    const [alert, setAlert] = useState({
        alertColor: "primary",
        alertMessage: "",
        isAlertOpen: false,
    });
    const isAbsense = useRef(false)
    const label = () => {
        if (selectedMonth && date) {
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return `${month} ${year}`;
        }
    };
    const [activities, setActivities] = useState([]);
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
    React.useEffect(() => {
        if (selectedMonth) {
            setDate(startOfMonth(parseISO(selectedMonth)));
        }
    }, [selectedMonth])
    React.useEffect(() => {
        if (date) {

            setActivities([
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
    const handleShowMore = () => {
        setVisibleItems((prev) => prev + 10)
    };
    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    };
    const handleMenuOpen = (event, date, status) => {
        setCurActivityDate(date)
        setAnchorEl(event.currentTarget);
    };
    const handlepenNew = (event, PopName,) => {
        isAbsense.current = PopName
        setAnchorEl(event.currentTarget);
    };



    // Date Formate
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split(' ');
        const months = {
            January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
            July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
        };
        return new Date(year, months[month], day);
    };
    const handleSelect = (value, type) => {
        setAnchorEl(false);
        isAbsense.current = false
        if (value && curActivityDate) {
            const date = parseDate(curActivityDate);
            setActivities((prevActivities) =>
                prevActivities.map(activity =>
                    activity.date === curActivityDate ? { ...activity, status: value } : activity
                )
            );
            const newEvent = {
                title: value,
                workType: value,
                date: date,
                dayType: type
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
    }

    const handleMenuClose = (value) => {
        isAbsense.current = false
        setAnchorEl(false);

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


    const handleSaveInfo = () => {
        setIsSaved(true)
        let counts = calculateDays(events)
        console.log(counts)
        setActivityCount(counts)
    }

    const calculateDays = (events) => {
        const workingDaysTitles = ["remotework", "travel", "atoffice", "training"];
        const halfDaysTitles = ["appointments", "injured", "illness", "emergency"];
        const absentDaysTitles = ["illness", "medicalappointment", "unpaidleave", "vacation"];

        let workingDays = 0;
        let halfDays = 0;
        let absentDays = 0;

        let reasons = {
            workingDays: {},
            halfDays: {},
            absentDays: {},
        };

        events.forEach(event => {
            if (workingDaysTitles.includes(event.workType.toLowerCase().replace(/\s+/g, '')) && event.dayType === "working day") {
                workingDays++;
                reasons.workingDays[event.workType.toLowerCase().replace(/\s+/g, '')] = (reasons.workingDays[event.workType.toLowerCase().replace(/\s+/g, '')] || 0) + 1;
            } else if (halfDaysTitles.includes(event.workType.toLowerCase().replace(/\s+/g, '')) && event.dayType === "half day") {
                halfDays++;
                reasons.halfDays[event.workType.toLowerCase().replace(/\s+/g, '')] = (reasons.halfDays[event.workType.toLowerCase().replace(/\s+/g, '')] || 0) + 1;
            } else if (absentDaysTitles.includes(event.workType.toLowerCase().replace(/\s+/g, '')) && event.dayType === "absence day") {
                absentDays++;
                reasons.absentDays[event.workType.toLowerCase().replace(/\s+/g, '')] = (reasons.absentDays[event.workType.toLowerCase().replace(/\s+/g, '')] || 0) + 1;
            }
        });

        return {
            workingDays,
            halfDays,
            absentDays,
            reasons,
        };
    };
    const handleChangeUser = (e) => {
        setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        let data = {
            clientId: AuthService.getUserid(),
            userId: employee,
            dateOfSubmitted: formFields.dateOfSubmission,
            name: selectedUser.firstName,
            surname: selectedUser.lastName,
            email: selectedUser.email,
            contactNumber: selectedUser.phoneNumber,
            status: "active",
            selectMonthDropdowns: [selectedMonth],
            comments: comments,
            attachments: '',
            days: events,
        }
        try {
            let res = await ActivityService.createActivity(data)
            if (res.success) {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
            } else {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Root>
            <Box className='mainContainer'>
                <Grid className='gridpo' container spacing={2} md={12} xs={12}>
                    <Grid sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }} item xs={12} md={8} spacing={3}>
                        <Box className="CalendarContainer">
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="date"
                                endAccessor="date"
                                style={{ height: 650, width: '100%' }}
                                defaultView="month"
                                views={['month']}
                                date={date}
                                components={{
                                    toolbar: (props) => (
                                        <CustomToolbar
                                            {...props}
                                            date={date}
                                            userList={userList}
                                            selectedMonth={selectedMonth}
                                            employee={employee}
                                            onMonthChange={handleMonthChange}
                                            onEmployeeChange={handleEmployeeChange}
                                            onNavigate={(newDate) => setDate(newDate)}
                                        />
                                    ),
                                }}
                                eventPropGetter={(event,) => {
                                    let backgroundColor = '#3174ad'; // Default color

                                    // Dynamically set color based on event properties
                                    if (event.dayType === "working day") {
                                        if (event.workType === 'At office' || event.workType === 'Travel' || event.workType === 'Training' || event.workType === 'Remote Work') backgroundColor = 'green';
                                    } else if (event.dayType === "absence day") {
                                        if (event.workType === 'Vacation' || event.workType === 'Unpaid Leave' || event.workType === 'Medical Appointment' || event.workType === 'Illness') backgroundColor = 'red';
                                    } else {
                                        if (event.workType === 'Emergency' || event.workType === 'Illness' || event.workType === 'Injured' || event.workType === 'Appointments') backgroundColor = 'orange';
                                    }
                                    return { style: { backgroundColor } };
                                }}
                            />
                        </Box>

                        <Box className="CommentSec">
                            <Box className="headerSec">
                                <Box><Typography variant="h6" sx={{ color: "#fff" }}>Comments</Typography></Box>
                                <Box className="plusIconSec"><Add size={12} sx={{ color: "#fff" }} /></Box>
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
                                            borderBottom: "1px solid #fff"
                                        },
                                    }}
                                />
                            </Box>

                        </Box>

                        <Box className="CommentSec">
                            <Box className="headerSec">
                                <Box><Typography variant="h6" sx={{ color: "#fff" }}>Attachment</Typography></Box>
                                <Box className="plusIconSec"><Add size={12} sx={{ color: "#fff" }} /></Box>
                            </Box>
                            <Box justifyContent="center" sx={{ display: "flex", gap: 1 }}>
                                <Box sx={{ backgroundColor: "#fff" }}>
                                    <ContentPasteIcon style={{ padding: "5px", fontSize: 60, textAlign: "center" }} />
                                </Box>
                                <Box sx={{ backgroundColor: "#fff" }}>
                                    <TextSnippetIcon style={{ padding: "5px", fontSize: 60, extAlign: "center" }} />
                                </Box>
                            </Box>
                        </Box>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        {
                            !isSaved ?
                                <Box className="activityList" sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: "5px",
                                }}>
                                    {activities.slice(0, visibleItems).map((activity, index) => (
                                        <List key={index} sx={{
                                            height: "70px",
                                            padding: "0 !important",
                                            borderRadius: "5px",
                                            backgroundColor: "#d9d9d9",
                                            marginBottom: "10px"
                                        }}>
                                            <ListItem>
                                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                    <Typography style={{ color: "#0075BC" }}>{activity.date}</Typography>
                                                    <Typography sx={{ color: "#727272" }}>{activity.status ? activity.status : "No report added"}</Typography>
                                                </Box>
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={(event) => handleMenuOpen(event, activity.date, activity.status)} sx={{ padding: "5px", borderRadius: "50%", backgroundColor: !activity.status ? "#0075bc" : "crimson" }}>
                                                        {!activity.status ? <Add size={12} sx={{ color: "#fff" }} /> :
                                                            <ClearIcon size={12} sx={{ color: "#fff" }} />}
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        </List>
                                    ))}
                                    {visibleItems < activities.length && (
                                        <Button onClick={handleShowMore} variant="contained" sx={{ marginTop: "10px", height: "60px" }}>
                                            Show More
                                        </Button>
                                    )}
                                    <Button onClick={handleSaveInfo} variant="contained" sx={{ marginTop: "10px", height: "60px" }}>
                                        Save
                                    </Button>
                                    {

                                        isAbsense.current === "working day" ?
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                                className='menuPopup'
                                                PaperProps={{
                                                    sx: {
                                                        border: "1px solid green",
                                                        borderRadius: "10px",
                                                        width: "160px"
                                                    },
                                                }}
                                            >
                                                <MenuItem sx={{ borderBottom: "1px solid green" }} onClick={() => handleSelect("At office", "working day")}>At office</MenuItem>
                                                <MenuItem sx={{ borderBottom: "1px solid green" }} onClick={() => handleSelect("Remote Work", "working day")}>Remote Work</MenuItem>
                                                <MenuItem sx={{ borderBottom: "1px solid green" }} onClick={() => handleSelect("Training", "working day")}>Training</MenuItem>
                                                <MenuItem onClick={() => handleSelect("Travel", "working day")}>Travel</MenuItem>
                                            </Menu>
                                            : isAbsense.current === "absence day" ?

                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleMenuClose}
                                                    className='menuPopup'
                                                    PaperProps={{
                                                        sx: {
                                                            border: "2px solid red",
                                                            borderRadius: "10px",
                                                            width: "160px"
                                                        },
                                                    }}
                                                >
                                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleSelect("Illness", "absence day")}>Illness</MenuItem>
                                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleSelect("Medical Appointment", "absence day")}>Medical Apiontment</MenuItem>
                                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleSelect("Unpaid Leave", "absence day")}>Unpaid Leave</MenuItem>
                                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleSelect("Vacation", "absence day")}>Vacation</MenuItem>
                                                </Menu>
                                                : isAbsense.current === "half day" ?

                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose}
                                                        className='menuPopup'
                                                        PaperProps={{
                                                            sx: {
                                                                border: "2px solid orange",
                                                                borderRadius: "10px",
                                                                width: "160px"
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem sx={{ borderBottom: "1px solid orange" }} onClick={() => handleSelect("Appointments", "half day")}>Appointments</MenuItem>
                                                        <MenuItem sx={{ borderBottom: "1px solid orange" }} onClick={() => handleSelect("Injured", "half day")}>Injured </MenuItem>
                                                        <MenuItem sx={{ borderBottom: "1px solid orange" }} onClick={() => handleSelect("Illness", "half day")}>Illness</MenuItem>
                                                        <MenuItem sx={{ borderBottom: "1px solid orange" }} onClick={() => handleSelect("Emergency", "half day")}>Emergency</MenuItem>
                                                    </Menu> :

                                                    <Menu sx={{ "& .MuiList-root": { backgroundColor: "#AFDEF1" } }}
                                                        anchorEl={anchorEl}
                                                        open={Boolean(anchorEl)}
                                                        onClose={handleMenuClose}
                                                        className='menuPopup'

                                                    >
                                                        <MenuItem sx={{
                                                            "&:hover": {
                                                                m: 1, backgroundColor: "green", borderRadius: "50%", height: "50px", width: "50px", padding: "13px", color: "#fff", fontWeight: 600
                                                            },
                                                            m: 1, backgroundColor: "green", borderRadius: "50%", height: "50px", width: "50px", padding: "13px", color: "#fff", fontWeight: 600
                                                        }} onClick={(e) => handlepenNew(e, "working day")}>WD</MenuItem>
                                                        <MenuItem sx={{
                                                            "&:hover": {
                                                                m: 1, backgroundColor: "crimson", borderRadius: "50%", height: "50px", width: "50px", padding: "13px", color: "#fff", fontWeight: 600
                                                            },
                                                            m: 1, backgroundColor: "crimson", borderRadius: "50%", height: "50px", width: "50px", padding: "13px", color: "#fff", fontWeight: 600
                                                        }} onClick={(e) => handlepenNew(e, "absence day")}>AD</MenuItem>
                                                        <MenuItem sx={{
                                                            "&:hover": {
                                                                m: 1, backgroundColor: "orange", borderRadius: "50%", height: "50px", width: "50px", padding: "13px", color: "#fff", fontWeight: 600
                                                            },
                                                            m: 1, backgroundColor: "orange", borderRadius: "50%", height: "50px", width: "50px", padding: "13px", color: "#fff", fontWeight: 600
                                                        }} onClick={(e) => handlepenNew(e, "half day")}>HD</MenuItem>
                                                    </Menu>
                                    }
                                </Box> :

                                <Grid item className='formSec' spacing={3} md={12} marginTop={5}>
                                    <Grid item xs={12}>
                                        <Box className="formSection">
                                            <Box className="textField">
                                                <Typography fontWeight='bold' variant="h6">Name</Typography>
                                                <TextField sx={{ fontWeight: 'bold' }} fullWidth variant="outlined"
                                                    // onChange={handleChangeUser}
                                                    error={submitForm && !formFields.firstName}
                                                    helperText={submitForm && !formFields.firstName ? "Name is required." : ""}
                                                    name="firstName" value={formFields.firstName} className='input' />
                                            </Box>
                                            <Box className="textField">
                                                <Typography fontWeight='bold' variant="h6">Surname</Typography>
                                                <TextField sx={{ fontWeight: 'bold' }}
                                                    // onChange={handleChangeUser}
                                                    error={submitForm && !formFields.lastName}
                                                    helperText={submitForm && !formFields.lastName ? "Surname is required." : ""}
                                                    fontWeight='bold' fullWidth name="lastName" variant="outlined" value={formFields.lastName} className='input' />
                                            </Box>
                                            <Box className="textField">
                                                <Typography fontWeight='bold' variant="h6">Date of Submission</Typography>
                                                <TextField sx={{ fontWeight: 'bold' }}
                                                    onChange={handleChangeUser}
                                                    error={submitForm && !formFields.dateOfSubmission}
                                                    helperText={submitForm && !formFields.dateOfSubmission ? "Date of Submission is required." : ""}
                                                    fontWeight='bold' fullWidth variant="outlined" type='date' name='dateOfSubmission' value={formFields.dateOfSubmission} className='input' />
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} >
                                        {/* <Box className="formSection"> */}
                                        <Accordion defaultExpanded className="accordion" >
                                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontWeight: "bold", color: "#2086C5" }} />} className="accordionSummary">
                                                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between !important" }}>
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}
                                                        variant="h6">
                                                        Total Worked Days: {activityCount?.workingDays ? activityCount.workingDays : 0}
                                                    </Typography>

                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}
                                                        variant="h6">
                                                        See details
                                                    </Typography>
                                                </Box>

                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container className='workdayList'  >
                                                    <Box className="workText" >
                                                        <Box> <TrainIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Travel</Typography></Box>
                                                    </Box>
                                                    <Box md={8} justifyContent={"flex-end"}>
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.workingDays?.travel ? activityCount.reasons.workingDays.travel : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <BusinessIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Office</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.workingDays?.atoffice ? activityCount.reasons.workingDays.atoffice : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <HomeIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Remote</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.workingDays?.remotework ? activityCount.reasons.workingDays.remotework : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <WorkIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Training</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.workingDays?.training ? activityCount.reasons.workingDays.training : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                        {/* </Box> */}
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Accordion className="accordion">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontWeight: "bold", color: "#2086C5" }} />} className="accordionSummary">
                                                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between !important" }}>
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">Absences {activityCount?.absentDays ? activityCount.absentDays : 0}</Typography>
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">See Details</Typography>
                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                < Grid container className='workdayList'  >
                                                    <Box className="workText" >
                                                        <Box> <TrainIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Vacation</Typography></Box>
                                                    </Box>
                                                    <Box md={8} justifyContent={"flex-end"}>
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.absentDays?.vacation ? activityCount.reasons.absentDays.vacation : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <BusinessIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Unpaid Leave</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.absentDays?.unpaidleave ? activityCount.reasons.absentDays.unpaidleave : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <HomeIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Medical Apiontment</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.absentDays?.medicalappointment ? activityCount.reasons.absentDays.medicalappointment : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <WorkIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Illness</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.absentDays?.illness ? activityCount.reasons.absentDays.illness : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                    <Grid item xs={12} >
                                        <Accordion className="accordion">
                                            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontWeight: "bold", color: "#2086C5" }} />} className="accordionSummary">
                                                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between !important" }}>
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">Half days {activityCount?.halfDays ? activityCount.halfDays : 0}</Typography>
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">See Details</Typography>
                                                </Box>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Grid container className='workdayList'  >
                                                    <Box className="workText" >
                                                        <Box> <TrainIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Emergency</Typography></Box>
                                                    </Box>
                                                    <Box md={8} justifyContent={"flex-end"}>
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.halfDays?.emergency ? activityCount.reasons.halfDays.emergency : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <BusinessIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Illness</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.halfDays?.illness ? activityCount.reasons.halfDays.illness : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <HomeIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Injured</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.halfDays?.injured ? activityCount.reasons.halfDays.injured : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid container className='workdayList'>
                                                    <Box className="workText" >
                                                        <Box> <WorkIcon className="icon" /></Box>
                                                        <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Appointments</Typography></Box>
                                                    </Box>
                                                    <Box >
                                                        <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>{activityCount?.reasons?.halfDays?.appointments ? activityCount.reasons.halfDays.appointments : 0}</Typography>
                                                    </Box>
                                                </Grid>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>
                                </Grid>}
                        <Grid container justifyContent="end">
                            <Button onClick={handleSubmit} variant="contained" >
                                Submit
                            </Button>
                        </Grid>
                    </Grid >
                </Grid >
            </Box>
            <Box>
                <AlertSnackbar alert={alert} setAlert={setAlert} />
            </Box>
        </Root >
    );
};

export default AddActivityReport;
