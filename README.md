# Weather Monitoring Dashboard

![Weather Dashboard]

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The **Weather Monitoring Dashboard** is a web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js) that provides real-time weather data, daily summaries, and interactive charts. It fetches data from the OpenWeatherMap API and displays it in a user-friendly interface.

## Features

- **Real-Time Weather Data**: Get current weather information for multiple cities.
- **Daily Summary**: View daily weather summaries including average, maximum, and minimum temperatures.
- **Temperature Conversion**: Switch between Celsius, Fahrenheit, and Kelvin.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Interactive Charts**: Visualize temperature data with charts using Recharts.
- **Alert Notifications**: Get notifications for weather alerts when applicable.

## Technologies Used

- **Frontend**: 
  - React.js
  - Material-UI (MUI)
  - Recharts
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
- **APIs**: 
  - OpenWeatherMap API

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sandeepdara-sd/Weather_Monitor.git
   cd Weather_Monitor
   Install dependencies for the backend:

bash
Copy code
cd backend
npm install
Install dependencies for the frontend:

bash
Copy code
cd ../frontend
npm install
Set up environment variables: Create a .env file in the backend directory and add your OpenWeatherMap API key:

plaintext
Copy code
OPENWEATHER_API_KEY=your_api_key_here
Run the application:

Start the backend server:
bash
Copy code
cd backend
npm start
Start the frontend server:
bash
Copy code
cd ../frontend
npm start
Usage
Open your browser and navigate to http://localhost:3000 to access the Weather Dashboard.
Select the desired temperature unit from the dropdown.
Explore current weather data and daily summaries displayed on the dashboard.
API Integration
The application utilizes the OpenWeatherMap API for fetching weather data. Ensure you have a valid API key to access real-time data.

Screenshots
Creating Rules:
![image](https://github.com/user-attachments/assets/8ee0a0ed-2336-45c9-bbf6-0a314e3ef801)
Combining Rules:
![image](https://github.com/user-attachments/assets/f0bbc390-3b62-4d00-9755-1d28f814a4a5)
Evaluating Rules:
![image](https://github.com/user-attachments/assets/e612606b-ad12-4aa5-b5ae-ed3f6f54f3aa)



Contributing
Contributions are welcome! If you would like to contribute to the project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/YourFeature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Sandeep Dara: sandeepdara-sd
Email: sandeepdara44@gmail.com
Feel free to reach out for any questions or collaborations!


