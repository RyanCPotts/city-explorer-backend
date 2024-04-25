const moviesData = require('../weather.json')
const axios = require('axios')



class Movie {
    constructor(moviesData) {
      this.title = moviesData.title;
      this.overview = moviesData.overview;
      this.release_date = moviesData.release_date;
      this.poster_path = moviesData.poster_path;
    }
  }


async function getMovies(req, res) {
    console.log(req, res)
    try {

   
    let{city} = req.query;
    let URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;

    const axiosResponse = await axios.get(URL);
    let moviesData = axiosResponse.data;
console.log(moviesData)
    let movie = moviesData.results.map( day => {
        return new Movie(day);
    })

    res.status(200).json(movie);
}   catch(e){
    res.status(500).json({e:'internal server error'})
}
}

module.exports = getMovies;