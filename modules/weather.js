const weatherData = require('../weather.json')
const axios = require('axios')

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
    console.log(req, res)
    try {

   
    let{lat, lon} = req.query;
    let URL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5&units=I`;

    const axiosResponse = await axios.get(URL);
    let weatherData = axiosResponse.data;

    let weather = weatherData.data.map( day => {
        return new Forecast(day);
    })

    res.status(200).json(weather);
}   catch(e){
    res.status(500).json({e:'internal server error'})
}
}

module.exports = getWeather;