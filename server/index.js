const express = require('express');
const path = require('path');
const app = express();
const { Asteroid } = require('../db/model');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/api/asteroids/:date', async (req, res) => {
  try {
    const test = await Asteroid.findOne();
    res.status(200).send(test.closeApproaches[0]);
  } catch (err) {
    res.status(400).send(err);
  }
})

app.listen(3000);