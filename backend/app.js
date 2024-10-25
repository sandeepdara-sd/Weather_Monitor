import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import weatherRoutes from './routes/weatherRoutes.js';
import { checkTemperatureThresholds } from './utils/alertService.js';
import { sendAlertEmail } from './utils/mailService.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/weather', weatherRoutes);

const PORT =  5000;

// Set interval to check weather and alert every 5 minutes
setInterval(async () => {
    const alertMessage = await checkTemperatureThresholds();
    if (alertMessage) {
        await sendAlertEmail(alertMessage);
    }
}, 5 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
