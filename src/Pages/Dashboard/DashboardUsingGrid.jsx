import { Box, styled, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from "@mui/material/Typography";
import ChartImg from '../../Assets/chart.jpg';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import TickPlacementBars from '../../Componenets/Chart';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { DashboardService } from '../../Services/Dashboard/DashboardServices';
import AuthService from '../../Services/AuthServices';
import { Helpers } from '../../Shell/Helper';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Root = styled(Box)({
    margin: 0,
    padding: 0,
    "& .mainContainer": {
        padding: "20px",
        backgroundColor: "#f4f7fe",
        "& .headerSection": {
            display: "flex",
            justifyContent: "space-between",
            padding: "30px 0px"
        },
        " & .inputField": {
            backgroundColor: "#ffffff",
            width: "341px",
            borderRadius: "10px"
        },
        "& .spentThisMonth": {
            borderRadius: "5px",
            backgroundColor: "#ffffff",
            display: 'flex',
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px"
        },
        "& .newClients": {
            borderRadius: "5px",
            backgroundColor: "#ffffff",
            display: 'flex',
            justifyContent: "start",
            alignItems: "center",
            padding: "38px 10px"
        },
        "& .earning": {
            // width: "257px",
            borderRadius: "20px",
            backgroundColor: "#ffffff",
            display: 'flex',
            gap: "20px",
            alignItems: "center",
            padding: "10px"
        },
        "& .activity": {
            // width: "257px",
            borderRadius: "20px",
            backgroundColor: "#0171BB",
            display: 'flex',
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px"
        },
        "& .secondSection": {
            // width: "475px",
            height: "325px",
            borderRadius: "20px",
            backgroundColor: " #FFFFFF",
            // BorderTop: "1px dashed red"

        },
        "& .expenseReportPerDay": {
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 20px 0px 20px",
        },
        "& .absenceRequests": {
            borderRadius: "5px",
            backgroundColor: " #FFFFFF",
            padding: "20px",
            height: "300px"
        },
        "& .MuiTypography-root": {
            lineHeight: "20px"
        },
        "& .thirdSection": {
            width: "475px",
            height: "345px",
            borderRadius: "20px",
            backgroundColor: " #FFFFFF",
            padding: "20px",
        },
        "& .approvedReport": {
            display: "flex",
            flexDirection: "column",
            gap: "15px"
        },
        // "& .rejectedReport": {
        //     display: "flex",
        //     flexDirection: "column",
        //     gap: "10px"
        // },


        "& .rejectedReport": {
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        },
        "& .activityReports": {
            width: "350px",
            padding: "20px !important",
            borderRadius: "20px",
            opacity: "0px",
            backgroundColor: "#FFFFFF",
        }
    }

});
const NewDashboard = () => {
    const [dashboard, setDashboard] = useState({
        activityByMonth: [],
        absenceByMonth: [],
        expenseByMonth: []
    })
    const [currentMonth, setCurrentMonth] = useState('');
    useEffect(() => {
        getActivitByMonth()
        getAbsenceByMonth()
        getExpenseByMonth()
        getCurrentMonthName();
    }, [])
    const getCurrentMonthName = () => {
        const date = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        setCurrentMonth(monthNames[date.getMonth()]);
    };
    //Get absence
    const getAbsenceByMonth = async () => {
        let currentdate = Helpers.getCurrentDate()
        try {
            let data = {
                userId: AuthService.getUserid(),
                month: currentdate.month,
                year: currentdate.year
            }
            let res = await DashboardService.getAbsenceReportsByMonth(data)
            if (res.success) {
                setDashboard((prevState) => ({ ...prevState, absenceByMonth: res.data }));
            }
        } catch (error) {
            console.log(error)
        }
    }
    //Get activity
    const getActivitByMonth = async () => {
        let currentdate = Helpers.getCurrentDate()
        try {
            let data = {
                userId: AuthService.getUserid(),
                month: currentdate.month,
                year: currentdate.year
            }
            let res = await DashboardService.getActivityReportsByMonth(data)
            if (res.success) {
                setDashboard((prevState) => ({ ...prevState, activityByMonth: res.data }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Get Expense
    const getExpenseByMonth = async () => {
        let currentdate = Helpers.getCurrentDate()
        try {
            let data = {
                userId: AuthService.getUserid(),
                month: currentdate.month,
                year: currentdate.year
            }
            let res = await DashboardService.getExpenseListByMonth(data)
            debugger

            if (res.success) {
                setDashboard((prevState) => ({ ...prevState, expenseByMonth: res.data }));
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Root>
            <Box className="mainContainer">
                <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Item>
                                    <Box className='secondSection'>
                                        <Box className='expenseReportPerDay'>
                                            <Box>
                                                <Box>
                                                    <Typography sx={{
                                                        fontWeight: 500,
                                                        fontSize: "14px",
                                                        lineHeight: "24px",
                                                        letterSpacing: "-2%",
                                                        color: "#A3AED0"
                                                    }}>Expense reports per day</Typography>
                                                </Box>
                                                <Box>
                                                    <Typography sx={{
                                                        fontSize: "24px",
                                                        fontWeight: 600,
                                                        lineHeight: "32px",
                                                        letterSpacing: "-2%",
                                                        color: "#1B2559"
                                                    }}>$682.5</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ height: "33px", width: "33px", borderRadius: "7px", backgroundColor: "#F4F7FE", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <BarChartRoundedIcon sx={{ color: "#0171BB" }} />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <TickPlacementBars />
                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={3} container flexDirection={"column"} rowGap={3}>
                                <Box className="spentThisMonth">
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            letterSpacing: "-2%",
                                            color: "#B3B3B3"
                                        }}>Spent this month</Typography>
                                        <Typography sx={{
                                            fontSize: "24px",
                                            fontWeight: 600,
                                            lineHeight: "32px",
                                            letterSpacing: "-2%",
                                            color: "#1B2559"
                                        }}>$682.5</Typography>
                                    </Box>
                                    <Box><img src={ChartImg} alt="" /></Box>
                                </Box>
                                <Box sx={{ gap: "10px" }} className="newClients">
                                    {/* <Box sx={{ height: "60px", width: "60px", borderRadius: "50%", backgroundColor: "#0171BB", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <PeopleAltIcon sx={{ color: "#ffffff" }} />
                                    </Box> */}
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#B3B3B3"
                                        }}>Number of Employees</Typography>
                                        <Typography sx={{
                                            fontSize: "20px",
                                            fontWeight: 700,
                                            lineHeight: "32px",
                                            color: "#0171bc",
                                        }}>321</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "28px 10px !important", justifyContent: "space-between" }}>
                                    <Box >
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            color: "#1B2559"
                                        }}>Rejected expense report</Typography>
                                        <Typography sx={{
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            color: "#B3B3B3"
                                        }}>Month of  {currentMonth}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: 700,
                                            fontSize: "20px",
                                            lineHeight: "28px",
                                            letteSpacing: "-2%",
                                            color: "#0171bc",
                                        }}>38</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3} container flexDirection={"column"} rowGap={3}>
                                <Box className="newClients">
                                    {/* <Box sx={{ height: "56px", width: "56px", borderRadius: "50%", backgroundColor: "#0171BB", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <PeopleAltIcon sx={{ color: "#ffffff" }} />
                                    </Box> */}
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: "14px",
                                            color: "#B3B3B3"
                                        }}>Number of approved activity reports</Typography>
                                        <Typography sx={{
                                            fontSize: "20px",
                                            fontWeight: 700,
                                            lineHeight: "32px",
                                            color: "#0171bc",
                                        }}>35</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "28px 10px !important", justifyContent: "space-between" }}>
                                    <Box >
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            color: "#1B2559"
                                        }}>Rejected activity report</Typography>
                                        <Typography sx={{
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            color: "#B3B3B3"
                                        }}>Month of  {currentMonth}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: 700,
                                            fontSize: "20px",
                                            lineHeight: "28px",
                                            letteSpacing: "-2%",
                                            color: "#0171bc",
                                        }}>38</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "#fff", padding: "28px 10px !important", justifyContent: "space-between" }}>
                                    <Box >
                                        <Typography sx={{
                                            fontWeight: 500,
                                            fontSize: "18px",
                                            color: "#1B2559"
                                        }}>Approved expense report</Typography>
                                        <Typography sx={{
                                            fontSize: "14px",
                                            fontWeight: 400,
                                            color: "#B3B3B3"
                                        }}>Month of  {currentMonth}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{
                                            fontWeight: 700,
                                            fontSize: "20px",
                                            lineHeight: "28px",
                                            letteSpacing: "-2%",
                                            color: "#0171bc",
                                        }}>38</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <Box className='absenceRequests'>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: 500,
                                                fontSize: "14px",
                                                lineHeight: "24px",
                                                letteSpacing: "-2%",
                                                color: "#A3AED0",
                                                // marginBottom: "20px"
                                            }}>Month of {currentMonth}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "18px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#1B2559",
                                                }}>Recent Activity</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "20px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171bc",
                                                }}>38</Typography>
                                            </Box>

                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "14px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#1B2559",
                                                }}>Rejected Expence Report</Typography>
                                                <Typography sx={{
                                                    fontWeight: 500,
                                                    fontSize: "12px",
                                                    lineHeight: "20px",
                                                    letteSpacing: "-2%",
                                                    color: "#A3AED0",
                                                }}>12 May 2024</Typography>

                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "14px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#1B2559",
                                                }}>Pannding Validation</Typography>
                                                <Typography sx={{
                                                    fontWeight: 500,
                                                    fontSize: "12px",
                                                    lineHeight: "20px",
                                                    letteSpacing: "-2%",
                                                    color: "#A3AED0",
                                                }}>12 May 2024</Typography>

                                            </Box>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "14px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#1B2559",
                                                }}>Pending Abaence Report</Typography>
                                                <Typography sx={{
                                                    fontWeight: 500,
                                                    fontSize: "12px",
                                                    lineHeight: "20px",
                                                    letteSpacing: "-2%",
                                                    color: "#A3AED0",
                                                }}>12 May 2024</Typography>

                                            </Box>


                                        </Box>
                                        <Box >
                                            <Link
                                                to={'/recent-activity'}
                                                style={{
                                                    display: "flex", justifyContent: "end", alignItems: "center", gap: "5px",
                                                    textDecoration: 'none',
                                                    cursor: "pointer",
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171BC"
                                                }} >
                                                View all
                                                <ArrowRightAltRoundedIcon sx={{ color: "#0171BC" }} />
                                            </Link>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box className='absenceRequests'>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: 500,
                                                fontSize: "14px",
                                                lineHeight: "24px",
                                                letteSpacing: "-2%",
                                                color: "#A3AED0",
                                                // marginBottom: "5px"
                                            }}>Month of {currentMonth}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "18px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#1B2559",
                                                }}>Pending Activity Reports</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "20px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171bc",
                                                }}>{dashboard?.activityByMonth?.length}</Typography>
                                            </Box>
                                        </Box>
                                        <Box >
                                            {dashboard?.activityByMonth?.slice(Math.max(dashboard?.activityByMonth?.length - 3, 0)).map((el, ind) => (
                                                <Box key={ind} marginBottom={2}>
                                                    <Typography sx={{
                                                        fontWeight: 700,
                                                        fontSize: "14px",
                                                        lineHeight: "28px",
                                                        letteSpacing: "-2%",
                                                        color: "#1B2559",
                                                    }}>{el.name} {el.surname}</Typography>
                                                    <Typography sx={{
                                                        fontWeight: 500,
                                                        fontSize: "12px",
                                                        lineHeight: "20px",
                                                        letteSpacing: "-2%",
                                                        color: "#A3AED0",
                                                    }}>{Helpers.dateFormater(el.createdDate)}</Typography>

                                                </Box>
                                            ))}
                                        </Box>

                                        <Box >
                                            <Link
                                                to={'/activity'}
                                                style={{
                                                    display: "flex", justifyContent: "end", alignItems: "center",
                                                    textDecoration: 'none',
                                                    cursor: "pointer",
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171BC"
                                                }} >
                                                View all
                                                <ArrowRightAltRoundedIcon sx={{ color: "#0171BC" }} />
                                            </Link>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box className='absenceRequests'>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: 500,
                                                fontSize: "14px",
                                                lineHeight: "24px",
                                                letteSpacing: "-2%",
                                                color: "#A3AED0",
                                                // marginBottom: "5px"
                                            }}>Month of  {currentMonth}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "18px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#1B2559",
                                                }}>Pending Absence Requests</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "20px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171bc",
                                                }}>{dashboard?.absenceByMonth?.length}</Typography>
                                            </Box>

                                        </Box>
                                        {dashboard?.absenceByMonth?.slice(Math.max(dashboard?.absenceByMonth?.length - 3, 0))?.map((el, ind) => (
                                            <Box key={ind} sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Box>
                                                    <Box marginBottom={1}>
                                                        <Typography sx={{
                                                            fontWeight: 700,
                                                            fontSize: "14px",
                                                            lineHeight: "28px",
                                                            letteSpacing: "-2%",
                                                            color: "#1B2559",
                                                        }}>{el.name} {el.lastName}</Typography>
                                                        <Typography sx={{
                                                            fontWeight: 500,
                                                            fontSize: "12px",
                                                            lineHeight: "20px",
                                                            letteSpacing: "-2%",
                                                            color: "#A3AED0",
                                                        }}>{Helpers.dateFormater(el.createdAt)}</Typography>

                                                    </Box>
                                                </Box>
                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                    <ArrowRightIcon sx={{ fontSize: "24px", color: "red" }} />
                                                    <Typography sx={{ fontWeight: "bold", fontSize: "14px", color: "red" }}>{el.reasonOfAbsence}</Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                        <Box >
                                            <Link
                                                to={'/absence'}
                                                style={{
                                                    display: "flex", justifyContent: "end", alignItems: "center", gap: "5px",
                                                    textDecoration: 'none',
                                                    cursor: "pointer",
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171BC"
                                                }} >
                                                View all
                                                <ArrowRightAltRoundedIcon sx={{ color: "#0171BC" }} />
                                            </Link>

                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={3}>
                                <Box className='absenceRequests'>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                        <Box>
                                            <Typography sx={{
                                                fontWeight: 500,
                                                fontSize: "14px",
                                                lineHeight: "24px",
                                                letteSpacing: "-2%",
                                                color: "#A3AED0",
                                                // marginBottom: "5px"
                                            }}>Month of  {currentMonth}</Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "18px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#1B2559",
                                                }}>Pending Expense Reports</Typography>
                                            </Box>
                                            <Box>
                                                <Typography sx={{
                                                    fontWeight: 700,
                                                    fontSize: "20px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171bc",
                                                }}>{dashboard?.expenseByMonth?.length}</Typography>
                                            </Box>

                                        </Box>
                                        {dashboard?.expenseByMonth?.slice(Math.max(dashboard?.expenseByMonth?.length - 3, 0))?.map((el, ind) => (
                                            <Box key={ind} sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Box>
                                                    <Typography sx={{
                                                        fontWeight: 700,
                                                        fontSize: "14px",
                                                        lineHeight: "28px",
                                                        letteSpacing: "-2%",
                                                        color: "#1B2559",
                                                    }}> {el.userName}</Typography>
                                                    <Typography sx={{
                                                        fontWeight: 500,
                                                        fontSize: "12px",
                                                        lineHeight: "20px",
                                                        letteSpacing: "-2%",
                                                        color: "#A3AED0",
                                                    }}>{Helpers.dateFormater(el.createdAt)}</Typography>
                                                </Box>
                                            </Box>
                                        ))}
                                        <Box >
                                            <Link
                                                to={'/expense'}
                                                style={{
                                                    display: "flex", justifyContent: "end", alignItems: "center", gap: "5px",
                                                    textDecoration: 'none',
                                                    cursor: "pointer",
                                                    fontWeight: 700,
                                                    fontSize: "16px",
                                                    lineHeight: "28px",
                                                    letteSpacing: "-2%",
                                                    color: "#0171BC"
                                                }} >
                                                View all
                                                <ArrowRightAltRoundedIcon sx={{ color: "#0171BC" }} />
                                            </Link>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Root>
    )
}

export default NewDashboard