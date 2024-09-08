import { GridOverlay } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

function CustomNoRowsOverlay() {
    return (
        <GridOverlay>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                No data found
            </Typography>
        </GridOverlay>
    );
}

export default CustomNoRowsOverlay;
