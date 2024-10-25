import express from 'express';
import { getWeatherData, getDailySummary } from '../controllers/weatherController.js';

const router = express.Router();

router.get('/current', getWeatherData);
router.get('/summary', getDailySummary);

export default router;
