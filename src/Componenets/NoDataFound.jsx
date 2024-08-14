import { GridOverlay } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

export default function CustomNoRowsOverlay() {
    return (
        <GridOverlay>
            <Box sx={{ mt: 1 }}>
                <Typography variant="h6">No Data Found</Typography>
            </Box>
        </GridOverlay>
    );
}