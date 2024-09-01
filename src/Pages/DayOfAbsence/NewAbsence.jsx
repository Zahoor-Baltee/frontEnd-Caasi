import React, { useEffect, useRef, useState } from 'react';
import { Grid, TextField, Typography, MenuItem, Box, Select } from '@mui/material';
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
import AuthService from '../../Services/AuthServices';
import { ActivityService } from '../../Services/Activity/ActivityServices';
import AlertSnackbar from '../../Componenets/AlertSnackbar';
import { useNavigate } from 'react-router-dom';
import { MdOutlineCalendarMonth } from "react-icons/md";

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
    const [isLoading, setIsLoading] = useState(false);
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
                    activity.date === curActivityDate ? { ...activity, status: value, type: type } : activity
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

    let navigateUser = useNavigate();
    const handleSubmit = async () => {
        setIsLoading(true)

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
            setSubmitForm(true)
            if (res.success) {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "success", alertMessage: res.message });
                setIsLoading(false)
                navigateUser('/activityreport')

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

                                    if (event.dayType === "working day") {
                                        if (
                                            event.workType === "At office" ||
                                            event.workType === "Travel" ||
                                            event.workType === "Training" ||
                                            event.workType === "Remote Work"
                                        )
                                            backgroundColor = "green";
                                    } else if (event.dayType === "absence day") {
                                        if (
                                            event.workType === "Vacation" ||
                                            event.workType === "Unpaid Leave" ||
                                            event.workType === "Medical Appointment" ||
                                            event.workType === "Illness"
                                        )
                                            backgroundColor = "red";
                                    } else {
                                        if (
                                            event.workType === "Emergency" ||
                                            event.workType === "Illness" ||
                                            event.workType === "Injured" ||
                                            event.workType === "Appointments"
                                        )
                                            backgroundColor = "orange";
                                    }
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
                            value='a'
                            sx={{ mx: 1, width: 300, color: "#fff", backgroundColor: "#D53631", height: "50px" }} >
                            <MenuItem value='a' >New Absence</MenuItem>
                            <MenuItem >asydfy</MenuItem>
                            <MenuItem >asydfy</MenuItem>
                        </Select>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Typography sx={{ color: "#52a9e1", fontWeight: "600" }} variant='h5'>Start Date</Typography>
                            <Box className="flexBox">
                                <Box style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                                    <Box className="dateBox">
                                        <Typography fontWeight="600" variant='h5'>28</Typography>
                                    </Box>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }}  >DD</Typography>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                                    <Box className="dateBox fill">
                                        <Typography fontWeight="600" variant='h5'>28</Typography>
                                    </Box>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }}>MM</Typography>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                                    <Box className="dateBox">
                                        <Typography fontWeight="600" variant='h5'>2890</Typography>
                                    </Box>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >YYYY</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Typography sx={{ color: "#52a9e1", fontWeight: "600" }} fontWeight="600" variant='h5'>End Date</Typography>
                            <Box className="flexBox">
                                <Box style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                                    <Box className="dateBox">
                                        <Typography fontWeight="600" variant='h5'>28</Typography>
                                    </Box>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >DD</Typography>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                                    <Box className="dateBox fill">
                                        <Typography fontWeight="600" variant='h5'>28</Typography>
                                    </Box>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >MM</Typography>
                                </Box>
                                <Box style={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                                    <Box className="dateBox">
                                        <Typography fontWeight="600" variant='h5'>2890</Typography>
                                    </Box>
                                    <Typography sx={{ color: "#52A9E1", fontSize: "14px", fontWeight: "600" }} >YYYY</Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Typography sx={{
                                color: "#52a9e1", fontWeight: "600"
                            }} fontWeight="600" variant='h5'>Total Days</Typography>
                            < Box className="flexBox" >
                                <Box>
                                    <Box style={{ borderRadius: "10px", backgroundColor: "#ACD9F2", padding: "5px 10px", }}>
                                        <MdOutlineCalendarMonth style={{ fontSize: "35px", color: "#088ADD" }} />
                                    </Box>
                                </Box>
                                <Box>
                                    <Box style={{ borderRadius: "10px", backgroundColor: "#ACD9F2", padding: "10px 16px", }}>
                                        <Typography fontWeight="600" variant='h5'>28</Typography>
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
                    <Grid item xs={6}>
                        {/* Attachment Section */}
                        <Box className="CommentSec">
                            <Box className="headerSec">
                                <Typography variant="h6" sx={{ color: "#fff" }}>Attachment</Typography>
                                <Box className="plusIconSec">
                                    <Add size={12} sx={{ color: "#fff" }} />
                                </Box>
                            </Box>
                            <Box justifyContent="center" sx={{ display: "flex", gap: 1 }}>
                                <Box sx={{}}>
                                    <ContentPasteIcon style={{ padding: "5px", fontSize: 60, textAlign: "center" }} />
                                </Box>
                                <Box sx={{}}>
                                    <TextSnippetIcon style={{ padding: "5px", fontSize: 60, textAlign: "center" }} />
                                </Box>
                            </Box>
                        </Box>
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
