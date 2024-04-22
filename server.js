'use strict';

const weatherData = require('./weather.json')

// read the contents of the .env file into the "environment"
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();

// Allow any client to make requests to this server
app.use(cors());

// home route
// responds to requests for the / path
// http://localhost:3000
app.get('/', (request, response) => {
  response.send('<h1>This is some html!</h1>');
});

class Forecast{
    constructor(weatherData){
        this.date = weatherData.datetime;
        this.description = weatherData.weather.description;
    }
}


app.get('/weather', getWeather)

async function getWeather(request, response){
    try{
    const{lat, lon, searchQuery} = request.query;
    console.log(lat, lon, searchQuery);
    const findWeather = weatherData.find((city)=>{
        return city.lat === lat || city.lon === lon || city.city_name.toLowerCase() === searchQuery
    })

    if(findWeather){
        // response.status(200).json(findWeather)
        // console.log(findWeather);
        // console.log(findWeather.data[0].weather);
        const forecastArray = findWeather.data.map((weatherDate) => new Forecast(weatherDate));
        response.status(200).json(forecastArray);
    }
}   catch(e){
    console.error(e.message)
}
}

function startServer() {
    let PORT = process.env.port || 3000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  }
  
  startServer();