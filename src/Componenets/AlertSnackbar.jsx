import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AlertSnackbar = ({ alert, setAlert }) => {

    const handleCloseAlert = (event, reason) => {

        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, isAlertOpen: false });
    };

    return (
        <Snackbar
            open={alert.isAlertOpen}
            autoHideDuration={2000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ position: "absolute" }}
        >
            <Alert onClose={handleCloseAlert} severity={alert.alertColor} sx={{ width: '100%' }}>
                {alert.alertMessage}
            </Alert>
        </Snackbar>
    );
};

export default AlertSnackbar;
