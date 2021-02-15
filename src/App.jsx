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
    axios.get(`/api/asteroids/${date}`)
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
      <svg width="70vw" height="100vh" align="center">
        <circle ref={img} cx="50%" cy="50%" r="60" fill="white"></circle>
        {asteroids.length && asteroids.map((asteroid, n) => {
          return <Asteroid earth={img} asteroid={asteroid} />
        })}
      </svg>
      <DropDown update={update} />
      <div className="info-list">
        {asteroids.length && asteroids.map((asteroid, n) => {
          return <AsteroidInfo name={asteroid.name} size={asteroid.size}
            time={asteroid.time} distance={asteroid.distance} velocity={asteroid.velocity} />
        })}
      </div>
    </>
  )
}

export default App;