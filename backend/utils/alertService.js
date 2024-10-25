import Weather from '../models/weatherModel.js';

export const checkTemperatureThresholds = async (threshold = 35) => {
    const latestWeather = await Weather.find().sort({ date: -1 }).limit(2); // Get the last 2 records
    if (latestWeather.length >= 2) {
        const [current, previous] = latestWeather;
        if (current.temperature > threshold && previous.temperature > threshold) {
            return `Alert: Temperature exceeded ${threshold}°C for ${current.city}`;
        }
    }
    return null;
};
