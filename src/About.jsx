import React, {useState} from 'react';

const About = () => {
  const [showInfo, toggleShowInfo] = useState(false);

  return (
    <div className="about">
      <div id="about" onClick={() => toggleShowInfo(!showInfo)}>Info {showInfo ? '↓' : '↑'}      </div>
        <div className="about-info" style={{display: showInfo ? "block" : "none"}}>
          Displays all near-earth-objects for a given day, as retrieved from NASA. Change the day to see historical records. Hover an asteroid's name on the right to see more info. Asteroid distance, size, and orbital speed are logarithmically proportional to the actual data. Red dots are "potentially hazardous" asteroids.
        </div>
    </div>
  )
}

export default About;