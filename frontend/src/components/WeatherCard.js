import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const WeatherCard = ({ city, temperature, feels_like, condition, unit }) => {
    const unitLabel = unit === 'C' ? '°C' : unit === 'F' ? '°F' : 'K';

    return (
        <Card sx={{ maxWidth: 345, margin: '1rem', backgroundColor: '#f0f0f0' }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Temperature: {temperature !== undefined ? `${temperature.toFixed(1)} ${unitLabel}` : 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Feels Like: {feels_like !== undefined ? `${feels_like.toFixed(1)} ${unitLabel}` : 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Condition: {condition}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
