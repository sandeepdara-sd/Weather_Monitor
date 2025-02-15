import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConfig.js';
import weatherRoutes from './routes/weatherRoutes.js';

import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/weather', weatherRoutes);

const PORT =  5000;




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
