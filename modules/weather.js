const weatherData = require('../weather.json')
const axios = require('axios')
let cache = require('./cache.js')
// OUT CODE IS FROM LAB 07

// class Forecast{
//     constructor(weatherData){
//         this.date = weatherData.datetime;
//         this.description = weatherData.weather.description;
//     }
// }

class Forecast {
  constructor(weatherData) {
    this.forecast = weatherData.weather.description;
    this.low = weatherData.low_temp;
    this.high = weatherData.high_temp;
    this.date = weatherData.datetime;
  }
}

// async function getWeather(request, response){
//     try{
//     const{lat, lon, searchQuery} = request.query;
//     console.log(lat, lon, searchQuery);
//     const findWeather = weatherData.find((city)=>{
//         return city.lat === lat || city.lon === lon || city.city_name.toLowerCase() === searchQuery
//     })

//     if(findWeather){
//         // response.status(200).json(findWeather)
//         // console.log(findWeather);
//         // console.log(findWeather.data[0].weather);
//         const forecastArray = findWeather.data.map((weatherDate) => new Forecast(weatherDate));
//         response.status(200).json(forecastArray);
//     }
// }   catch(e){
//     console.error(e.message)
// }
// }

async function getWeather(req, res) {

  // try {

    let { lat, lon } = req.query;
    const key = `${lat}:${lon}`;
        if (!lat || !lon) {
      return res.status(400).json({ error: 'please add a valid lat and lon' })
    }
    

    if(cache[key]) {
      let now = Date.now();
      let timestamp = (now - cache[key].timestamp)/1000;
      if(timestamp < 3600){
        console.log('time passed', timeStamp)
        console.log('cache data', cache[key])
        res.json(cache[key].data);
        return;
      }
      
    }
    console.log('no weather in cache')
    // else {
    //   console.log('Cache miss');
    //   cache[key].timestamp = Date.now();
    //   cache[key].data = 
    // }
    let URL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

    const axiosResponse = await axios.get(URL);
    let weatherData = axiosResponse.data;

    let weather = weatherData.data.map(day => {
      return new Forecast(day);
    })

    cache[key] = {
      data: weather,
      timestamp: Date.now()
    }


    res.status(200).json(weather);
  // } catch (e) {
  //   res.status(500).json({ e: 'internal server error' })
  // }
}

module.exports = getWeather;