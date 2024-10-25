import axios from 'axios';



export const fetchWeatherData = async () => {
    const response = await axios.get('http://localhost:5000/api/weather/current');
    return response.data;
};

export const fetchDailySummary = async () => {
    const response = await axios.get('http://localhost:5000/api/weather/summary');
    return response.data;
};
