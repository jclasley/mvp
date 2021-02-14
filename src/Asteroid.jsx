import React, {useEffect, useState, useRef} from 'react';
import {Overlay, Tooltip} from 'react-bootstrap';

const degToRad = function (deg) {
  return deg * Math.PI / 180;
}

const randomSign = () => Math.random() > 0.5 ? 1 : -1;

const Asteroid = ({asteroid, earth}) => {
  const { time, distance, velocity, size, name, hazardous } = asteroid;
  const [placement, changePlacement] = useState('left');
  const [show, toggleShow] = useState(false);
  // const svg = d3.select('asteroids').append('svg')
  //   .attr()
  const svg = useRef(null);
  useEffect(() => {
    changePlacement(svg.current && svg.current.cx.baseVal.value > earthX ? 'right' : 'left');
  }, [svg])

  const earthX = earth.current.cx.baseVal.value;
  const earthY = earth.current.cy.baseVal.value;
  const earthR = earth.current.r.baseVal.value;
  const randAngle = Math.random() * 2 * Math.PI;
  let centerX = (Math.log(distance.kilometers) ** 2 + earthR) * Math.sin(randAngle) + earthX;
  let centerY = (Math.log(distance.kilometers) ** 2 + earthR) * Math.cos(randAngle) + earthY;
  const avgSize = (size.kilometers.estimated_diameter_max + size.kilometers.estimated_diameter_min) / 2;

  const color = (() => `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`)()

  return (
      <>
        <circle fill={color}
        onClick={()=>console.log('entered')}
        ref={svg} cx={centerX} cy={centerY} r={Math.abs(Math.log10(avgSize)) * 4} />
      <circle cx={earthX} cy={earthY} r={Math.log(distance.kilometers) ** 2 + earthR}
        fill="none" stroke={color}/>

      </>
  )
};

export default Asteroid;
