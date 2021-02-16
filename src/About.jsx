import React, {useState} from 'react';

const About = ({popRef}) => {
  const [showInfo, toggleShowInfo] = useState(false);

  return (
    <>
      <div id="about" ref={popRef} onClick={() => toggleShowInfo(!showInfo)}>Info {showInfo ? '↓' : '↑'}      </div>
        <div className="about-info" style={{display: showInfo ? "block" : "none"}}>
        Displays all near-earth-objects for a given day, as retrieved from NASA. Change the day to see historical records. Hover an asteroid's name on the right to see more info. <br />
        
        Distance from the earth is calculated as `ln^2(d_a) + r_e` where `d_a` is distance of the asteroid from the earth in kilometers, and `r_e` is the radius of the central SVG element. Asteroid radius is calculated as `ln(r * 1000)` where `r` is the average of the minimum and maximum estimated radius for a given asteroid. An asteroid's orbital period is calculated from its velocity when passing the earth via `200 / v`, where `v` is velocity in kilometers per second. Orbital paths are perfectly circular and not indicative of an asteroid's true orbit. Red dots are "potentially hazardous" asteroids. <br />
        Music provided royalty free by <a href="https://www.bensound.com">Ben Sound</a>
        </div>
        </>
  )
}

export default About;