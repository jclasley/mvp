const axios = require('axios');
// require('dotenv').config()

module.exports = {
  getDate: (date, key) => {
    return axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${key}`).then(({ data }) => {
      return data.near_earth_objects[date]
    });
  }
}