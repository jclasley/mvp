const { default: AsteroidInfo } = require('../src/AsteroidInfo');
const { Asteroid, Approach } = require('./model');

const r = (async () => {
  const a = await Approach.findOne({date: "1900-12-17"});
  return a;
})();
console.log(r);