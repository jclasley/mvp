import React, {useEffect, useState, useRef} from 'react';
import styles from './App.css';
import Earth from './assets/earth2.png';
import Asteroid from './Asteroid';
const Controller = require('../controllers/index');

const App = () => {
  const [asteroids, setAsteroids] = useState([]);
  const now = new Date(Date.now());
  const img = useRef(null);

  const month = now.getMonth() + 1 < 10 ? `0${now.getMonth() + 1}` : `${now.getMonth() + 1}`;
  const today = `${now.getUTCFullYear()}-${month}-${now.getDate()}`
  useEffect(() => {
    Controller.getToday().then(({data}) => {
      return data.near_earth_objects[today]
    })
      .then(objects => objects.map(obj => {
        return {
          time: obj.close_approach_data[0].close_approach_date_full,
          distance: obj.close_approach_data[0].miss_distance,
          velocity: obj.close_approach_data[0].relative_velocity,
          size: obj.estimated_diameter,
          name: obj.name,
          hazardous: obj.is_potentially_hazardous_asteroid
        }
      }))
      .then(mapped => setAsteroids(mapped));
  }, [])

  return (
    <>
      <div>React is working!</div>
      <svg width="100vw" height="100vh" align="center">
        <circle ref={img} cx="50%" cy="50%" r="100"></circle>
        {asteroids.length && asteroids.map(asteroid => {
          console.log(asteroid)
          return <Asteroid earth={img} asteroid={asteroid} />
        })}
      </svg>
    </>
  )
}

export default App;