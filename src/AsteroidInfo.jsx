import React, {useState} from 'react';

const AsteroidInfo = ({time, distance, velocity, size, name, select}) => {
  const [isHover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
    const circles = document.getElementsByTagName('circle');
    for (let circle of circles) {
      circle.id !== name && circle.setAttribute('style', 'opacity: 0.25;')
    }
    document.getElementById(`${name}-outline`).setAttribute('stroke', 'white')
    document.getElementById(`${name}-outline`).setAttribute('style', 'opacity: 1;')
  }
  const handleMouseLeave = () => {
    setHover(false);
    const circles = document.getElementsByTagName('circle');
    for (let circle of circles) {
      circle.setAttribute('style', 'opacity: 1;')
    }
    document.getElementById(`${name}-outline`).setAttribute('stroke', 'none')
  }
  return (
    <>
      <div className="asteroidList" color={isHover ? "lightblue" : "white"}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{name}</div>
      {isHover && (
        <div className="asteroidInfo">
          {name}
          <p>Size: {(size.kilometers.estimated_diameter_max + size.kilometers.estimated_diameter_min) / 2}</p>
          <p>Distance: {distance.kilometers} km</p>
          <p>Velocity: {velocity.kilometers_per_hour} kph</p>
          <p>Closest to Earth: {time} UTC</p>
        </div>
      )}
    </>
  )
}

export default AsteroidInfo;