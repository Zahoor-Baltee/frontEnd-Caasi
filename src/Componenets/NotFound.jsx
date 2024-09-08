import { Box, Typography } from '@mui/material'
import React from 'react'
import styled from '@mui/system/styled';
const Root = styled(Box)({
    margin: 0,
    padding: 0,
    "& .cnt": {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
})
function NotFound() {
    return (
        <Root>
            <Box className="cnt">
                <img src='' alt='' />
                <Typography variant='h4'>404 Not Found.</Typography>
            </Box>
        </Root>

    )
}

export default NotFound
