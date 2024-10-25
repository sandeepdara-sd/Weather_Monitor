import axios from 'axios';

export const getWeatherFromAPI = async (city) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        const data = response.data;
        const tempCelsius = data.main.temp - 273.15;
        return {
            city,
            tempCelsius,
            feels_like: data.main.feels_like - 273.15,
            weatherCondition: data.weather[0].main,
        };
    } catch (error) {
        console.error(`Error fetching weather data for ${city}: ${error.message}`);
        throw new Error('API Error');
    }
};
