import axios from 'axios';
import React, {useEffect, useState, useRef } from 'react';
import Asteroid from './Asteroid';
import AsteroidInfo from './AsteroidInfo';
import DropDown from './DropDown';
const Controller = require('../controllers/index');

const App = () => {
  const [asteroids, setAsteroids] = useState([]);
  const img = useRef(null);

  useEffect(() => {
    axios.get('/api/asteroids')
      .then(({data}) => data.map(obj => {
        return {
          time: obj.closeApproaches[0].date,
          distance: obj.closeApproaches[0].missDistance,
          velocity: obj.closeApproaches[0].relativeVelocity,
          size: obj.estimatedDiameter,
          name: obj.name,
          hazardous: obj.hazardous
        }
      }))
      .then((mapped) => setAsteroids(mapped));
  }, [])

  const update = (date) => {
    axios.get(`https://evening-wave-10124.herokuapp.com/api/asteroids/${date}`)
      .then(({ data }) => data.map(obj => {
        return {
          time: obj.closeApproaches[0].date,
          distance: obj.closeApproaches[0].missDistance,
          velocity: obj.closeApproaches[0].relativeVelocity,
          size: obj.estimatedDiameter,
          name: obj.name,
          hazardous: obj.hazardous
        }
      }))
      .then((mapped) => setAsteroids(mapped)); 
  }

  return (
    <>
      <svg width="100vw" height="100vh" align="center">
        <circle ref={img} cx="50%" cy="50%" r="60" fill="white"></circle>
        {asteroids.length && asteroids.map((asteroid, n) => {
          return <Asteroid earth={img} asteroid={asteroid} />
        })}
      </svg>
      <DropDown update={update} />
      <div className="summary">
        Displaying {asteroids.length} asteroids
      </div>
      <div className="info-list">
        {asteroids.length && asteroids.map((asteroid, n) => {
          return <AsteroidInfo name={asteroid.name} size={asteroid.size}
            time={asteroid.time} distance={asteroid.distance} velocity={asteroid.velocity} />
        })}
      </div>
      <div className="about">
        Displays all near-earth-objects for a given day, as retrieved from NASA. Change the day to see historical records. Hover an asteroid's name on the right to see more info. Asteroid distance, size, and orbital speed are logarithmically proportional to the actual data.
      </div>
    </>
  )
}

export default App;