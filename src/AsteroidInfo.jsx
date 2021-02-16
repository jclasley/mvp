import React, {useState} from 'react';

const AsteroidInfo = ({time, distance, velocity, size, name, select}) => {
  const [isHover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
    const circles = document.getElementsByTagName('circle');
    for (let circle of circles) {
      circle.id !== name && circle.setAttribute('style', 'opacity: 0.25;')
    }
    const form = document.getElementsByTagName('form');
    for (let f of form) {
      f.setAttribute('style', 'opacity: 0.25;');
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
    const form = document.getElementsByTagName('form');
    for (let f of form) {
      f.setAttribute('style', 'opacity: 1;');
    }
    document.getElementById(`${name}-outline`).setAttribute('stroke', 'none')
  }
  return (
    <>
      <div className="asteroidList" 
        style={{color: isHover ? "lightblue" : "white", opacity: isHover ? 1 : 0.5}}
        onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{name}</div>
      {isHover && (
        <div className="asteroidInfo">
          <p className="name">{name}</p>
          <p>Diameter: {((size.kilometers.max + size.kilometers.min) / 2).toFixed(2)} km</p>
          <p>Distance: {distance.km.toFixed(2)} km</p>
          <p>Velocity: {velocity.kph.toFixed(2)} kph</p>
          <p>Closest to Earth: {time} UTC</p>
        </div>
      )}
    </>
  )
}

export default AsteroidInfo;