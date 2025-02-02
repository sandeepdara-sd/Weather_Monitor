import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchWeatherData = async () => {
    
    const response = await axios.get(`${API_URL}/api/weather/current`);
    return response.data;
};

export const fetchDailySummary = async () => {
    const response = await axios.get(`${API_URL}/api/weather/summary`);
    return response.data;
};

