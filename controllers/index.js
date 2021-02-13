const axios = require('axios');
// require('dotenv').config()

module.exports = {
  getToday: () => {
    const now = new Date(Date.now());
    const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : `${now.getMonth() + 1}`;
    const today = `${now.getUTCFullYear()}-${month}-${now.getDate()}`
    const tomorrow = `${now.getUTCFullYear()}-${month}-${now.getDate() + 1}`
    return axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${tomorrow}&api_key=${process.env.API_KEY}`);
  }
}