import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Button, Divider
} from '@mui/material';
import styled from '@emotion/styled'; // This is correct
import { IoIosArrowDropleftCircle } from "react-icons/io";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { CheckCircle, Info } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ExpenseService } from '../../Services/Expense/ExpenseService';
import AlertSnackbar from '../../Componenets/AlertSnackbar';
import Barcode from 'react-barcode';
import { Helpers } from '../../Shell/Helper';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
const Root = styled(Box)({
    margin: 0,
    padding: 0,
    "& .mainContainer": {
        padding: "20px",
        backgroundColor: "#f4f7fe",

        "& .ReportContainer": {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ffffff",
            borderRadius: "5px",
            padding: "20px 50px",
        },
        "& .Transportation": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px"
        }
    }

});
function ExpenseReports() {
    const [reports, setReports] = useState({})
    const [alert, setAlert] = useState({
        alertColor: "primary",
        alertMessage: "",
        isAlertOpen: false,
    });

    let { state } = useLocation()
    useEffect(() => {
        if (state?.id) {
            gReportDetail()
        }
    }, [state])

    const gReportDetail = async () => {
        try {
            let data = {
                id: state?.id
            }
            let res = await ExpenseService.getDetail(data)
            if (res.success) {
                setReports(res.data)

            } else {
                setAlert({ ...alert, isAlertOpen: true, alertColor: "error", alertMessage: res.error });
            }
        } catch (error) {

        }
    }
    let navigate = useNavigate();

    const handleClick = () => {
        // if (state.from === "user") {
        //     navigate('/userinformation');
        // } else {
        navigate('/expense-list');
        // }
    };
    return (
        <Root>
            <Box className="mainContainer">

                <Box sx={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                    <IoIosArrowDropleftCircle onClick={handleClick} style={{ cursor: "pointer", fontSize: "30px", color: "#0073BC" }} />
                    <Typography sx={{ color: "#374557", fontSize: "20px", fontWeight: "600" }}>
                        {reports?.status === "Pending" ? 'Pending' : reports?.status === 'Approved' ? 'Approved' : 'Rejected'} expense report
                    </Typography>
                </Box>
                <Box className="ReportContainer">
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: reports?.status === "Pending" ? "1px solid #FFBC10" : reports?.status === "Approved" ? "1px solid #18ab56" : "1px solid #eb5757",
                                gap: "5px",
                                borderRadius: "5px",
                                textTransform: "none",
                                backgroundColor: reports?.status === "Pending" ? "#FEFFE5" : reports?.status === "Approved" ? "#f0fff8" : "#fff0f0", color: "#374557",
                                height: "40px",
                                width: "115px",
                            }}>
                            {reports?.status === 'Pending' ? <WatchLaterIcon sx={{ fontSize: "20px", color: "#F38F19" }} /> : reports?.status === 'Approved' ? <CheckCircleIcon sx={{ color: "#18ab56" }} /> : <CancelOutlinedIcon sx={{ color: "red" }} />}
                            <Typography sx={{
                                color: reports?.status === "Pending" ? "#FFBC10" : reports?.status === "Approved" ? "#18ab56" : "#eb5757",
                            }}>
                                {reports?.status}
                            </Typography>
                        </Button>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center", height: "38px",
                                width: "38px", backgroundColor: "#0A75BD",
                                color: "#ffffff", borderRadius: "10px"
                            }}>
                            <EditOutlinedIcon />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: "200px", alignItems: 'center', marginBottom: "10px", mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                            <AccountCircleRoundedIcon sx={{ fontSize: "35px", color: "#0073BC" }} />
                            <Typography sx={{ color: "#374557", fontSize: "18px", fontWeight: "600" }}>{reports?.userName}</Typography>
                        </Box>
                        <Typography sx={{ color: "#374557", fontSize: "14px", fontWeight: "600" }}>
                            Date of Submission: {Helpers.dateFormater(reports?.dateOfSubmitted)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <Box className='Transportation'>
                            <Button
                                variant="contained"
                                sx={{
                                    textAlign: "center",
                                    width: "800px",
                                    backgroundColor: reports?.status === "Rejected" ? '#DC3545' : "#0A75BD",
                                    textTransform: 'none',
                                }}>
                                {reports?.category}
                            </Button>
                            {reports?.status === "Rejected" ? <Info sx={{ color: "#DC3545" }} /> : reports?.status === "pending" ? <WatchLaterIcon sx={{ color: "#F38F19" }} /> : <CheckCircle sx={{ color: "#18AB56" }} />}
                        </Box>
                        <Box className='Transportation'>
                            { } <Button
                                variant="contained"
                                sx={{
                                    textAlign: "center",
                                    width: "800px",
                                    backgroundColor: '#0A75BD',
                                    textTransform: 'none',
                                }}>
                                ${reports?.amount}
                            </Button>
                            {reports?.status === "Rejected" ? <Info sx={{ color: "#DC3545" }} /> : reports?.status === "pending" ? <WatchLaterIcon sx={{ color: "#F38F19" }} /> : <CheckCircle sx={{ color: "#18AB56" }} />}
                        </Box>
                        <Box className='Transportation'>
                            <Button
                                variant="contained"
                                sx={{
                                    textAlign: "center",
                                    width: "800px",
                                    backgroundColor: '#0A75BD',
                                    textTransform: 'none',
                                }}>
                                {Helpers.dateFormater(reports?.updateDate)}
                            </Button>
                            {reports?.status === "Rejected" ? <Info sx={{ color: "#DC3545" }} /> : reports?.status === "pending" ? <WatchLaterIcon sx={{ color: "#F38F19" }} /> : <CheckCircle sx={{ color: "#18AB56" }} />}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Box sx={{ width: "400px", height: "250" }}>
                            {/* <img src={Recepit} height='100%' width='100%' alt="" /> */}
                            {/* <QRCodeGenerator scan={reports?.scan} /> */}
                            {/* <QRCode value={} size={256} /> */}
                            <Barcode value={reports?.scan} />
                            {/* <QRCode value="https://example.com" size={150} /> */}
                        </Box>
                    </Box>
                    <Box >
                        <Box>
                            <Typography sx={{ color: "#0171BC", fontWeight: "600" }}>
                                Discription
                            </Typography>
                            <Typography>
                                {reports?.description}
                            </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />

                        <Typography sx={{ color: "#0171BC", fontWeight: "600" }}>
                            reason of rejected expense report
                        </Typography>
                        <Typography variant="body2" mt={1}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s.
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <AlertSnackbar alert={alert} setAlert={setAlert} />
                </Box>

            </Box>
        </Root >
    );
}

export default ExpenseReports;
