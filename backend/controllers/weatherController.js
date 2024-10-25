import Weather from '../models/weatherModel.js';
import { getWeatherFromAPI } from '../services/weatherService.js';

import { sendAlertEmail } from '../utils/mailService.js';

// export const getWeatherData  = async (req, res) => {
//     try {
//         const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
//         const weatherData = await Promise.all(cities.map(city => getWeatherFromAPI(city)));

//         // Save data to DB
//         for (const data of weatherData) {
//             await Weather.create({
//                 city: data.city,
//                 temperature: data.tempCelsius,
//                 feelsLike: data.feels_like,
//                 weatherCondition: data.weatherCondition,
//                 date: new Date(),
//             });
//         }

//         // Check if alert conditions are met
//         const alertMessage = await checkTemperatureThresholds();
//         if (alertMessage) {
//             await sendAlertEmail(alertMessage);
//             console.log("Alert email triggered:", alertMessage);
//         }
        
//         res.status(200).json({ success: true, data: weatherData });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

export const getWeatherData = async (req, res) => {
    try {
        const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
        const weatherData = await Promise.all(cities.map(city => getWeatherFromAPI(city)));
        
        // Save data to DB
        for (const data of weatherData) {
            await Weather.create({
                city: data.city,
                temperature: data.tempCelsius,
                feelsLike: data.feels_like,
                weatherCondition: data.weatherCondition,
            });
        }
        
        res.status(200).json({ success: true, data: weatherData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Aggregate daily data
export const getDailySummary = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dailySummary = await Weather.aggregate([
          { $match: { date: { $gte: today, $lt: tomorrow } } },
          {
              $group: {
                  _id: "$city",
                  averageTemp: { $avg: "$temperature" },
                  maxTemp: { $max: "$temperature" },
                  minTemp: { $min: "$temperature" },
                  dominantCondition: { $push: "$weatherCondition" }
              }
          },
          {
              $project: {
                  city: "$_id", // Rename _id to city
                  averageTemp: 1,
                  maxTemp: 1,
                  minTemp: 1
              }
          }
      ]);
      

        res.status(200).json(dailySummary);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
