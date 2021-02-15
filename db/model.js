const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mvp', {useNewUrlParser: true, useUnifiedTopology: true});

const asteroidSchema = new mongoose.Schema({
  'astId': String,
  'name': String,
  'limitedName': String,
  'jplUrl': String,
  'estimatedDiameter': {
    kilometers: {
      min: Number,
      max: Number,
    },
    meters: {
      min: Number,
      max: Number,
    },
    miles: {
      min: Number,
      max: Number,
    },
    feet: {
      min: Number,
      max: Number,
    }
  },
  hazardous: Boolean,
  closeApproaches: [{
    date: String,
    relativeVelocity: {
      kps: String,
      kph: String,
      mph: String
    },
    missDistance: {
      km: String,
      miles: String
    }
  }]
});

const Asteroid = mongoose.model('Asteroid', asteroidSchema);

module.exports = {
  Asteroid
}
