import { Box, Typography } from '@mui/material'
import React from 'react'
import styled from '@mui/system/styled';
import sadicon from '../Assets/sadIcon.png'
const Root = styled(Box)({
    margin: 0,
    padding: 0,
    "& .cnt": {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 15
    }
})
function NotFound() {
    return (
        <Root>
            <Box className="cnt">
                <img src={sadicon} alt='ico' />
                <Typography variant='h4'>404 Not Found.</Typography>
                <Typography variant='body2'>Oops! The page you were looking for doesn't exist.</Typography>
            </Box>
        </Root>

    )
}

export default NotFound
