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
// const [event, setEvent] = useState([])

// const events = [
//     {
//         title: 'Telework',
//         start: new Date(2024, 4, 1),
//         end: new Date(2024, 4, 1),
//     },
//     {
//         title: 'Training',
//         start: new Date(2024, 4, 13),
//         end: new Date(2024, 4, 13),
//     },
//     {
//         title: 'Onsite',
//         start: new Date(2024, 4, 22),
//         end: new Date(2024, 4, 23),
//     },
// ];

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
            height: '100vh',
            width: "100%",
            // marginTop: "20px",
            // marginLeft: "5px",

            "& .formSection": {
                padding: "20px",
                boxShadow: "1px 2px 14px 1px rgba(0, 0, 0, 0.19)",
                marginBottom: "8px",
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
    const label = () => {
        if (selectedMonth && date) {
            const month = date.toLocaleString('default', { month: 'long' });
            const year = date.getFullYear();
            return `${month} ${year}`;
        }
    };
    const [activities, setActivities] = useState([]);

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
                { date: `31 ${label()}`, status: '' },
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
    const handleMenuOpen = (event, date) => {
        setCurActivityDate(date)
        setAnchorEl(event.currentTarget);
    };
    const isAbsense = useRef(false)
    const handleMenuOpens = (event, date) => {
        isAbsense.current = true
        setCurActivityDate(date)
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
    const handleSelect = (value) => {
        setAnchorEl(false);
        if (value && curActivityDate) {
            const date = parseDate(curActivityDate);
            setActivities((prevActivities) =>
                prevActivities.map(activity =>
                    activity.date === curActivityDate ? { ...activity, status: value } : activity
                )
            );
            const newEvent = {
                title: value,
                start: date,
                end: date,
            };
            setEvents((prevEvents) => [...prevEvents, newEvent]);
        }
    }

    const handleMenuClose = (value) => {
        setAnchorEl(false);

    };

    const handleMonthChange = (newMonth) => {
        setSelectedMonth(newMonth);
        setDate(startOfMonth(parseISO(newMonth)));
    };

    const handleEmployeeChange = (newEmployee) => {
        setEmployee(newEmployee);
    };





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
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 650, width: '100%' }}
                                defaultView="month"
                                views={['month']}
                                date={date}
                                components={{
                                    toolbar: (props) => (
                                        <CustomToolbar
                                            {...props}
                                            date={date}
                                            selectedMonth={selectedMonth}
                                            employee={employee}
                                            onMonthChange={handleMonthChange}
                                            onEmployeeChange={handleEmployeeChange}
                                            onNavigate={(newDate) => setDate(newDate)}
                                        />
                                    ),
                                }}
                                eventPropGetter={(event, start, end, isSelected) => {
                                    let backgroundColor = '#3174ad'; // Default color

                                    // Dynamically set color based on event properties
                                    if (event.title === 'At office' || event.title === 'Telework' || event.title === 'Training' || event.title === 'Remote Work') backgroundColor = 'green';
                                    if (event.title === 'Vacation' || event.title === 'Unpaid Leave' || event.title === 'Medical Apiontment' || event.title === 'Illness') backgroundColor = 'red';
                                    if (event.title === 'high') backgroundColor = 'orange';

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
                                            {!activity.status ?
                                                <IconButton onClick={(event) => handleMenuOpen(event, activity.date)} sx={{ padding: "5px", borderRadius: "50%", backgroundColor: "#0075bc" }}>
                                                    <Add size={12} sx={{ color: "#fff" }} />
                                                </IconButton>
                                                :

                                                <IconButton onClick={(event) => handleMenuOpens(event, activity.date)} sx={{ padding: "5px", borderRadius: "50%", backgroundColor: "crimson" }}>
                                                    <ClearIcon size={12} sx={{ color: "#fff" }} />
                                                </IconButton>
                                            }
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                            ))}
                            {visibleItems < activities.length && (
                                <Button onClick={handleShowMore} variant="contained" sx={{ marginTop: "10px", height: "60px" }}>
                                    Show More
                                </Button>
                            )}
                            {isAbsense.current === false ?
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
                                    <MenuItem sx={{ borderBottom: "1px solid green" }} onClick={() => handleSelect("At office")}>At office</MenuItem>
                                    <MenuItem sx={{ borderBottom: "1px solid green" }} onClick={() => handleSelect("Remote Work")}>Remote Work</MenuItem>
                                    <MenuItem sx={{ borderBottom: "1px solid green" }} onClick={() => handleSelect("Training")}>Training</MenuItem>
                                    <MenuItem onClick={() => handleSelect("Telework")}>Telework</MenuItem>
                                </Menu>
                                :

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
                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleMenuClose("Illness")}>Illness</MenuItem>
                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleMenuClose("Medical Apiontment")}>Medical Apiontment</MenuItem>
                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleMenuClose("Unpaid Leave")}>Unpaid Leave</MenuItem>
                                    <MenuItem sx={{ borderBottom: "1px solid red" }} onClick={() => handleMenuClose("Vacation")}>Vacation</MenuItem>
                                    <MenuItem onClick={() => handleMenuClose("Telework")}>Telework</MenuItem>
                                </Menu>
                            }


                        </Box>

                        {/* <Grid item className='formSec' spacing={3} md={12} marginTop={5}>
                            <Grid item xs={12}>
                                <Box className="formSection">
                                    <Box className="textField">
                                        <Typography fontWeight='bold' variant="h6">Name</Typography>
                                        <TextField sx={{ fontWeight: 'bold' }} fullWidth variant="outlined" value="Carlos" className='input' />
                                    </Box>
                                    <Box className="textField">
                                        <Typography fontWeight='bold' variant="h6">Surname</Typography>
                                        <TextField sx={{ fontWeight: 'bold' }} fontWeight='bold' fullWidth variant="outlined" value="Fonte" className='input' />
                                    </Box>
                                    <Box className="textField">
                                        <Typography fontWeight='bold' variant="h6">Date of Submission</Typography>
                                        <TextField sx={{ fontWeight: 'bold' }} fontWeight='bold' fullWidth variant="outlined" value="23 Mar 2024" className='input' />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} marginTop={2}>
                                <Box className="formSection">
                                    <Accordion defaultExpanded className="accordion">
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontWeight: "bold", color: "#2086C5" }} />} className="accordionSummary">
                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between !important" }}>
                                                <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}
                                                    variant="h6">
                                                    Total Worked Days: 4
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
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>1</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid container className='workdayList'>
                                                <Box className="workText" >
                                                    <Box> <BusinessIcon className="icon" /></Box>
                                                    <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Office</Typography></Box>
                                                </Box>
                                                <Box >
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>1</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid container className='workdayList'>
                                                <Box className="workText" >
                                                    <Box> <HomeIcon className="icon" /></Box>
                                                    <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Remote</Typography></Box>
                                                </Box>
                                                <Box >
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>1</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid container className='workdayList'>
                                                <Box className="workText" >
                                                    <Box> <WorkIcon className="icon" /></Box>
                                                    <Box><Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>Training</Typography></Box>
                                                </Box>
                                                <Box >
                                                    <Typography sx={{ fontWeight: "bold", color: "#2086C5" }}>1</Typography>
                                                </Box>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                            <Grid item xs={12} marginTop={1}>
                                <Box className="formSection">
                                    <Accordion className="accordion">
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontWeight: "bold", color: "#2086C5" }} />} className="accordionSummary">
                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between !important" }}>
                                                <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">Absences 1</Typography>
                                                <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">See Details</Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Absence details go here...</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box className="formSection">
                                    <Accordion className="accordion">
                                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontWeight: "bold", color: "#2086C5" }} />} className="accordionSummary">
                                            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between !important" }}>
                                                <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">Half days 1</Typography>
                                                <Typography sx={{ fontWeight: "bold", color: "#2086C5" }} variant="h6">See Details</Typography>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>Half day details go here...</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>
                            </Grid>
                        </Grid> */}
                    </Grid >
                </Grid >
            </Box>
        </Root >
    );
};

export default AddActivityReport;
