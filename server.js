'use strict';

const weatherData = require('./weather.json')

// read the contents of the .env file into the "environment"
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const getWeather = require('./modules/weather.js')
const getMovies = require('./modules/movies.js')
const app = express();

// Allow any client to make requests to this server
app.use(cors());

// home route
// responds to requests for the / path
// http://localhost:3000
app.get('/', (request, response) => {
  response.send('<h1>This is some html!</h1>');
});

app.get('/weather', getWeather)
app.get('/movies', getMovies)

function startServer() {
    let PORT = process.env.port || 3000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  }
  
  startServer();