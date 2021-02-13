const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mvp', {useNewUrlParser: true, useUnifiedTopology: true});

const approachSchema = new mongoose.Schema({
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
})

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
  closeApproaches: [approachSchema]
});

const Asteroid = mongoose.model('Asteroid', asteroidSchema);
const Approach = mongoose.model('Approach', approachSchema);

module.exports = {
  Asteroid,
  Approach
}
