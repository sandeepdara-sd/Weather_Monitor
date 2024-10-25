import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const WeatherSummary = ({ city, averageTemp, maxTemp, minTemp, unit }) => {
    const unitLabel = unit === 'C' ? '°C' : unit === 'F' ? '°F' : 'K';

    return (
        <Card sx={{ maxWidth: 345, margin: '1rem', backgroundColor: '#f0f0f0' }}>
            <CardContent>
                <Typography variant="h5">{city} - Daily Summary</Typography>
                <Typography variant="body2">Average Temperature: {averageTemp.toFixed(2)} {unitLabel}</Typography>
                <Typography variant="body2">Max Temperature: {maxTemp.toFixed(2)} {unitLabel}</Typography>
                <Typography variant="body2">Min Temperature: {minTemp.toFixed(2)} {unitLabel}</Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherSummary;
