import React, { useEffect, useState } from 'react';
import {
    Grid,
    Typography,
    Container,
    Box,
    AppBar,
    Toolbar,
    Tabs,
    Tab,
    Select,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import { fetchWeatherData, fetchDailySummary } from '../services/weatherService';
import WeatherCard from '../components/WeatherCard';
import WeatherSummary from '../components/WeatherSummary';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const Dashboard = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [dailySummary, setDailySummary] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState('C');

    const convertTemperature = (tempCelsius, toUnit) => {
        switch (toUnit) {
            case 'F': return (tempCelsius * 9) / 5 + 32;
            case 'K': return tempCelsius + 273.15;
            default: return tempCelsius;
        }
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const weather = await fetchWeatherData();
                setWeatherData(weather.data);

                const summary = await fetchDailySummary();
                setDailySummary(summary);

                

                setLastUpdated(new Date().toLocaleTimeString());
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 300000);
        return () => clearInterval(intervalId);
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const weatherChartData = weatherData.map(weather => ({
        city: weather.city,
        temperature: convertTemperature(weather.tempCelsius, unit),
        feels_like: convertTemperature(weather.feels_like, unit),
    }));

    const dailyChartData = dailySummary.map(summary => ({
        city: summary.city,
        averageTemp: convertTemperature(summary.averageTemp, unit),
        maxTemp: convertTemperature(summary.maxTemp, unit),
        minTemp: convertTemperature(summary.minTemp, unit),
    }));

    return (
        <Container maxWidth="lg" sx={{ fontFamily: 'Roboto, sans-serif', backgroundColor: '#121212', color: '#e0e0e0', padding: 3, minHeight: '100vh' }}>
            <AppBar
                position="static"
                sx={{
                    background: 'linear-gradient(145deg, #1e1e1e, #2c2c2c)',
                    boxShadow: '0px 4px 20px rgba(0, 255, 255, 0.4)',
                    borderBottom: '3px solid #00e5ff',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" sx={{ color: '#00e5ff', fontWeight: 'bold' }}>
                        Weather Dashboard
                    </Typography>
                    <Select
                        value={unit}
                        onChange={handleUnitChange}
                        sx={{
                            ml: 'auto',
                            color: 'white',
                            backgroundColor: '#333',
                            borderRadius: '5px',
                            boxShadow: '0px 0px 15px rgba(0, 229, 255, 0.8)',
                            '& .MuiSvgIcon-root': {
                                color: 'white',
                            },
                            '&:hover': {
                                backgroundColor: '#444',
                            },
                        }}
                        variant="outlined"
                    >
                        <MenuItem value="C">Celsius (°C)</MenuItem>
                        <MenuItem value="F">Fahrenheit (°F)</MenuItem>
                        <MenuItem value="K">Kelvin (K)</MenuItem>
                    </Select>
                </Toolbar>
            </AppBar>

            <Box my={4}>
                <Typography variant="h3" align="center" sx={{ color: '#00e5ff', fontWeight: 'bold', mt: 2 }}>
                    Weather Dashboard
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                    Last updated: {lastUpdated ? lastUpdated : 'Fetching data...'}
                </Typography>

                

                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    sx={{
                        backgroundColor: '#222',
                        boxShadow: '0px 4px 15px rgba(0, 255, 255, 0.3)',
                        mt: 2,
                        borderRadius: '5px',
                        '& .MuiTab-root': {
                            color: '#ffffff',
                        },
                        '& .Mui-selected': {
                            color: '#00e5ff !important',
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Tab label="Weather Cards" />
                    <Tab label="Daily Summary" />
                </Tabs>

                {loading ? (
                    <CircularProgress sx={{ display: 'block', mx: 'auto', my: 3, color: '#00e5ff' }} />
                ) : (
                    <>
                        {value === 0 && (
                            <>
                                <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                                    {weatherData.map((weather, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={index}>
                                            <WeatherCard
                                                city={weather.city}
                                                temperature={convertTemperature(weather.tempCelsius, unit)}
                                                feels_like={convertTemperature(weather.feels_like, unit)}
                                                condition={weather.weatherCondition}
                                                icon={weather.icon}
                                                unit={unit}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#00e5ff' }}>
                                        Current Temperature Chart ({unit})
                                    </Typography>
                                </Box>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <LineChart
                                        width={650}
                                        height={320}
                                        data={weatherChartData}
                                        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                                        style={{
                                            backgroundColor: '#1c1c1e',
                                            boxShadow: '0px 6px 20px rgba(0, 229, 255, 0.3)',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                        <XAxis dataKey="city" stroke="#e0e0e0" />
                                        <YAxis stroke="#e0e0e0" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#333',
                                                color: '#00e5ff',
                                                borderRadius: '5px',
                                            }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="temperature" stroke="#82ca9d" strokeWidth={2} />
                                        <Line type="monotone" dataKey="feels_like" stroke="#8884d8" strokeWidth={2} />
                                    </LineChart>
                                </Box>
                            </>
                        )}
                        {value === 1 && (
                            <>
                                <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                                    {dailySummary.map((summary) => (
                                        <WeatherSummary
                                            key={summary._id}
                                            {...summary}
                                            unit={unit}
                                            averageTemp={convertTemperature(summary.averageTemp, unit)}
                                            maxTemp={convertTemperature(summary.maxTemp, unit)}
                                            minTemp={convertTemperature(summary.minTemp, unit)}
                                        />
                                    ))}
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: '#00e5ff' }}>
                                        Daily Temperature Summary Chart ({unit})
                                    </Typography>
                                    
                                </Box>
                                
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <LineChart
                                        width={650}
                                        height={320}
                                        data={dailyChartData}
                                        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                                        style={{
                                            backgroundColor: '#1c1c1e',
                                            boxShadow: '0px 6px 20px rgba(0, 229, 255, 0.3)',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                        <XAxis dataKey="city" stroke="#e0e0e0" />
                                        <YAxis stroke="#e0e0e0" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#333',
                                                color: '#00e5ff',
                                                borderRadius: '5px',
                                            }}
                                        />
                                        <Legend />
                                        <Line type="monotone" dataKey="averageTemp" stroke="#82ca9d" strokeWidth={2} />
                                        <Line type="monotone" dataKey="maxTemp" stroke="#f57f17" strokeWidth={2} />
                                        <Line type="monotone" dataKey="minTemp" stroke="#00b0ff" strokeWidth={2} />
                                    </LineChart>
                                </Box>
                            </>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};

export default Dashboard;
