import React, {useRef, useEffect, useState} from 'react';

const degToRad = function (deg) {
  return deg * Math.PI / 180;
}

const randomSign = () => Math.random() > 0.5 ? 1 : -1;

const Asteroid = ({asteroid, earth}) => {
  const [isSelected, setSelected] = useState(false);
  const { distance, velocity, size, hazardous } = asteroid;
  // const svg = d3.select('asteroids').append('svg')
  //   .attr()
  const ref = useRef(null);
  useEffect(() => {
    ref.current && ref.current.classList.length && 
      ref.current.classList.includes('selected') && setSelected(true);
  }, [ref])

  const earthX = earth.current.cx.baseVal.value;
  const earthY = earth.current.cy.baseVal.value;
  const earthR = earth.current.r.baseVal.value;
  const randAngle = Math.random() * 2 * Math.PI;
  const calcX = (angle) => (Math.log(distance.kilometers) ** 2 + earthR) * Math.sin(angle) + earthX;
  const calcY = (angle) => (Math.log(distance.kilometers) ** 2 + earthR) * Math.cos(angle) + earthY;
  let centerX = calcX(randAngle);
  let centerY = calcY(randAngle);
  const avgSize = (size.kilometers.estimated_diameter_max + size.kilometers.estimated_diameter_min) / 2;
  const radius = Math.log(distance.kilometers) ** 2 + earthR;

  const calcOpposite = () => randAngle > Math.PI ? randAngle + Math.PI : randAngle - Math.PI;

  return (
      <>
        <circle id={asteroid.name} fill={hazardous ? "red" : "white"}
          r={Math.abs(Math.log10(avgSize)) * 4}>
          <animateMotion dur={`${1 / velocity.kilometers_per_second * 200}s`} repeatCount="indefinite" begin="0s" path={`M ${centerX} ${centerY}
                A ${radius} ${radius} 0 1 0
                  ${calcX(calcOpposite())} ${calcY(calcOpposite())}
                A ${radius} ${radius} 0 1 0
                  ${centerX} ${centerY}
                Z
                `} />
        </circle>
        <circle id={`${asteroid.name}-outline`} fill="none" 
          stroke={"none"}
          r={20}>
          <animateMotion dur={`${1 / velocity.kilometers_per_second * 200}s`} repeatCount="indefinite" begin="0s" 
            path={`M ${centerX} ${centerY}
                A ${radius} ${radius} 0 1 0
                  ${calcX(calcOpposite())} ${calcY(calcOpposite())}
                A ${radius} ${radius} 0 1 0
                  ${centerX} ${centerY}
                Z
                `} />
        </circle>
      </>
  )
};

export default Asteroid;
