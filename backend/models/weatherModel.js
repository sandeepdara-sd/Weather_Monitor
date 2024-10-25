import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
    city: { type: String, required: true },
    temperature: { type: Number, required: true },
    feelsLike: { type: Number, required: true },
    weatherCondition: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Weather = mongoose.model('Weather', weatherSchema);

export default Weather;
