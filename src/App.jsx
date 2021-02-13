import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styles from './App.css';
import Earth from './assets/earth2.png';
const Controller = require('../controllers/index');

const App = () => {
  const [asteroids, setAsteroids] = useState([]);
  useEffect(() => {
    Controller.getToday().then((res) => console.log(res))
  }, [])

  return (
    <>
      <div>React is working!</div>
      <img src={Earth}></img>
    </>
  )
}

export default App;