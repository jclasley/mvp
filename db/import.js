const data = require('./data.json');
const {Asteroid, Approach} = require('./model');

const a = new Asteroid({ name: 'test' })

data.near_earth_objects.forEach((obj) => {
  const asteroid = new Asteroid({
    astId: obj.id,
    name: obj.name,
    limitedName: obj.name_limited,
    jplUrl: obj.nasa_jpl_url,
    estimatedDiameter: {
      kilometers: {
        min: obj.estimated_diameter.kilometers.estimated_diameter_min,
        max: obj.estimated_diameter.kilometers.estimated_diameter_max
      },
      meters: {
        min: obj.estimated_diameter.meters.estimated_diameter_min,
        max: obj.estimated_diameter.meters.estimated_diameter_max
      },
      miles: {
        min: obj.estimated_diameter.miles.estimated_diameter_min,
        max: obj.estimated_diameter.miles.estimated_diameter_max
      },
      feet: {
        min: obj.estimated_diameter.feet.estimated_diameter_min,
        max: obj.estimated_diameter.feet.estimated_diameter_max
      }
    },
    hazardous: obj.is_potentially_hazardous_asteroid,
    closeApproaches: obj.close_approach_data.map((approach) => {
        return ({
          date: approach.close_approach_date,
          relativeVelocity: {
            kps: approach.relative_velocity.kilometers_per_second,
            kph: approach.relative_velocity.kilometers_per_hour,
            mph: approach.relative_velocity.miles_per_hour
          },
          missDistance: {
            km: approach.miss_distance.kilometers,
            miles: approach.miss_distance.miles,
          }
        })
      })
    })

  asteroid.save();
})
