import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Box, styled } from '@mui/material';
import { BorderTop } from '@mui/icons-material';
// import { BorderTop } from '@mui/icons-material';


const Root = styled(Box)({
    "& .MuiBarElement-root": {
        fill: '#27A9E0',
        rx: 10
    },
    "& .MuiChartsAxis-line": {
        display: "none"
    },
    "& .MuiChartsAxis-tick": {
        display: "none"
    },
    '& .MuiChartsAxis-directionY .MuiChartsAxis-tickLabel': {
        display: 'none',
    },
    "& .css-172kpif-MuiResponsiveChart-container": {
        position: 'relative',
        bottom: "20px",

    }
});

const dataset = [
    {
        expenses: 400,
        month: 'Jan',
    },
    {
        expenses: 300,
        month: 'Feb',
    },
    {
        expenses: 200,
        month: 'Mar',
    },
    {
        expenses: 100,
        month: 'Apr',
    },
    {
        expenses: 80,
        month: 'May',
    },
    {
        expenses: 60,
        month: 'June',
    },
    {
        expenses: 40,
        month: 'July',
    },
    {
        expenses: 30,
        month: 'Aug',
    },
    {
        expenses: 20,
        month: 'Sept',
    },
    {
        expenses: 15,
        month: 'Oct',
    },
    {
        expenses: 10,
        month: 'Nov',
    },
    {
        expenses: 5,
        month: 'Dec',
    },
];


const chartSetting = {
    series: [{ dataKey: 'expenses', }],
    height: 280,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};
export default function TickPlacementBars() {
    return (
        <Root>
            <Box style={{ width: '100%' }}>
                <BarChart
                    dataset={dataset}
                    xAxis={[
                        { scaleType: 'band', dataKey: 'month', },
                    ]}
                    {...chartSetting}
                />
            </Box>
        </Root>
    );
}
