import React, {useEffect} from 'react';
import * as d3 from 'd3';
import {useD3} from './hooks/useD3';

const degToRad = function (deg) {
  return deg * Math.PI / 180;
}

const randomSign = () => Math.random() > 0.5 ? 1 : -1;

const Asteroid = ({asteroid, earth}) => {
  const { time, distance, velocity, size, name, hazardous } = asteroid;
  // const svg = d3.select('asteroids').append('svg')
  //   .attr()
  const earthX = earth.current.cx.baseVal.value;
  const earthY = earth.current.cy.baseVal.value;
  const earthR = earth.current.r.baseVal.value;
  const randAngle = Math.random() * 2 * Math.PI;
  let centerX = (30 * Math.abs(Math.log(distance.lunar)) + earthR) * Math.sin(randAngle) + earthX;
  let centerY = (30 * Math.abs(Math.log(distance.lunar)) + earthR) * Math.cos(randAngle) + earthY;
  const avgSize = (size.kilometers.estimated_diameter_max + size.kilometers.estimated_diameter_min) / 2
  return (
    <circle cx={centerX} cy={centerY} r={Math.abs(Math.log10(avgSize))} />
  )
};

export default Asteroid;
