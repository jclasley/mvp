const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mvp', {useNewUrlParser: true, useUnifiedTopology: true});


const approachSchema = new mongoose.Schema({
  date: String,
  relativeVelocity: {
    kps: Number,
    kph: Number,
    mph: Number
  },
  missDistance: {
    km: Number,
    miles: Number
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
const Approach = mongoose.model('Approach', asteroidSchema);

module.exports = {
  Asteroid,
  Approach
}
