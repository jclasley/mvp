import axios from 'axios';
import React, {useEffect, useState, useRef } from 'react';
import Asteroid from './Asteroid';
import AsteroidInfo from './AsteroidInfo';
import DropDown from './DropDown';
import About from './About';
import Intro from './Intro';
import song from './assets/bensound-slowmotion.mp3';

const App = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [audio, setAudio] = useState(null);
  const [firstTime, getFirstTime] = useState(null);
  const img = useRef(null);
  const topLeft = useRef(null);
  const info = useRef(null);
  const zen = useRef(null);
  const astInfo = useRef(null);

  useEffect(() => {
    setAudio(new Audio(song));
    getFirstTime(!localStorage.getItem('first_visit'));
    axios.get(`${process.env.URL || ''}/api/asteroids`)
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
    axios.get(`${process.env.URL || ''}/api/asteroids/${date}`)
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

  const zenMode = () => {
    const forms = document.getElementsByTagName('form');
    const sum = document.getElementById('summary')
    const info = document.getElementById('info')
    const about = document.getElementById('about')
    const zen = document.getElementById('zen');
    audio.loop = true;
    audio.paused ? audio.play() : audio.pause();
    for (let form of forms) { 
      form.style.opacity = form.style.opacity === '0' ? '1' : '0';
    }
    sum.style.opacity = sum.style.opacity === '0' ? '1' : '0';
    info.style.opacity = info.style.opacity === '0' ? '1' : '0';
    about.style.opacity = about.style.opacity === '0' ? '1' : '0';
    zen.style.opacity = zen.style.opacity === '0.25' ? '1' : '0.25';
  }

  const handleZenIn = (e) => {
    e.target.style.opacity = e.target.style.opacity === '0.25' ? '1' : e.target.style.opacity
  }

  const handleZenOut = (e) => {
    const sum = document.getElementById('summary')
    e.target.style.opacity = sum.style.opacity === '0' ? '0.25' : '1';
  }

  return (
    <>
      <svg width="100vw" height="100vh" align="center">
        <circle ref={img} cx="50%" cy="50%" r="60" fill="white"></circle>
        {asteroids.length && asteroids.map((asteroid, n) => {
          return <Asteroid earth={img} asteroid={asteroid} />
        })}
      </svg>
      <div className="top-left">
        <div id='top-left'>
          <DropDown popRef={topLeft} update={update} />
        </div>
        <div ref={zen} id="zen" className="zen" 
          onMouseEnter={e => handleZenIn(e)} 
          onMouseLeave={e => handleZenOut(e)} 
          onClick={() => zenMode()}>
            Zen mode
        </div>
      </div>
      
      <div ref={astInfo} id='summary' className="summary">
        Displaying {asteroids.length} asteroids
      </div>
      <div  id="info" className="info-list">
        {asteroids.length && asteroids.map((asteroid, n) => {
          return <AsteroidInfo name={asteroid.name} size={asteroid.size}
            time={asteroid.time} distance={asteroid.distance} velocity={asteroid.velocity} />
        })}
      </div>
      
      <div className="about"> 
        <About popRef={info} />
      </div>
      <div className="copyright">
        <small>Made by <a href="http://github.com/jclasley">Jon Lasley</a>, 2021</small>
      </div>
      <Intro firstTime={firstTime} topLeft={topLeft} info={info} zen={zen} astInfo={astInfo} />
    </>
  )
}

export default App;