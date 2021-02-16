import React from 'react';

const Asteroid = ({asteroid, earth}) => {
  const { distance, velocity, size, hazardous } = asteroid;

  const earthX = earth.current.cx.baseVal.value;
  const earthY = earth.current.cy.baseVal.value;
  const earthR = earth.current.r.baseVal.value;
  const randAngle = Math.random() * 2 * Math.PI;
  const calcX = (angle) => (Math.log(distance.km) ** 2 + earthR) * Math.sin(angle) + earthX;
  const calcY = (angle) => (Math.log(distance.km) ** 2 + earthR) * Math.cos(angle) + earthY;
  let centerX = calcX(randAngle);
  let centerY = calcY(randAngle);
  const avgSize = (size.kilometers.min + size.kilometers.max) / 2;
  const radius = Math.log(distance.km) ** 2 + earthR;

  const calcOpposite = () => randAngle > Math.PI ? randAngle + Math.PI : randAngle - Math.PI;

  return (
      <>
        <circle id={asteroid.name} fill={hazardous ? "red" : "white"}
          r={Math.abs(Math.log10(avgSize)) * 4}>
          <animateMotion dur={`${1 / velocity.kps * 200}s`} repeatCount="indefinite" begin="0s" path={`M ${centerX} ${centerY}
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
          <animateMotion dur={`${1 / velocity.kps * 200}s`} repeatCount="indefinite" begin="0s" 
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
