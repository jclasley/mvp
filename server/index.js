const express = require('express');
const path = require('path');
const app = express();
const { Asteroid } = require('../db/model');
const createAsteroid = require('../db/import');
const Controller = require('../controllers/index');
const formatDate = require('../controllers/helpers');
require('dotenv').config()

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/api/asteroids/:date?', async (req, res) => {
  try {
    const date = formatDate(req.params.date || new Date(Date.now()))
    let results = await Asteroid.find({ 
      'closeApproaches.date': { 
        '$regex': `.*${date.replace(/\-/g, '\\-')}.*`
      }
    });
    if (!results.length) {
      results = await Controller.getDate(date, process.env.API_KEY);
      results = results.map((asteroid) => {
        const a = createAsteroid(asteroid);
        a.save();
        return a;
      });
    }
    res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
})

app.get('/test/:date', async (req, res) => {
  try {
    const a = await Asteroid.find({'closeApproaches.date': {'$regex': `.*${req.params.date}`}});
    res.status(200).send(a.map(a => a.name));
  } catch (err) {
    res.status(400).send(err);
  }
})

app.listen(process.env.PORT || 3000);