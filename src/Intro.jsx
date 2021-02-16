import React, {useState} from 'react';
import {Popover, Overlay} from 'react-bootstrap';

const Intro = ({firstTime, topLeft, info, zen, astInfo}) => {
  if (!firstTime) return <></>;

  const [dateInfo, showDateInfo] = useState(true);
  const [astInfoState, showAstInfo] = useState(false);
  const [zenInfo, showZenInfo] = useState(false);
  const [infoInfo, showInfoInfo] = useState(false);

  const datePop = (
    <Popover onClick={() => {
      showDateInfo(false);
      showAstInfo(true);
    }}>
      <Popover.Title as="h3">Search by date</Popover.Title>
      <Popover.Content>
        Right now the page is showing the asteroid's as catalogued by NASA for today's date. Change this date to any date in the past or future to see historical data or predictions, respectively.<br />
        <small>Click to continue</small>
      </Popover.Content>
    </Popover>
  )

  const astPop = (
    <Popover onClick={() => {
      showAstInfo(false);
      showZenInfo(true);
    }}>
      <Popover.Title as="h3">Asteroid list</Popover.Title>
      <Popover.Content>
        This is the list of the names of asteroids that are being displayed. Hover over a name to highlight the corresponding asteroid and see more info about it.<br />
        <small>Click to continue</small>
      </Popover.Content>
    </Popover>
  )

  const zenPop = (
    <Popover onClick={() => {
      showZenInfo(false);
      showInfoInfo(true);
    }}>
      <Popover.Title as="h3">Zen mode</Popover.Title>
      <Popover.Content>
        Zen mode toggles other elements on the screen, since I personally find the asteroid rotation mesmerizing. It comes with a great soundtrack.<br />
        <small>Click to continue</small>
      </Popover.Content>
    </Popover>
  )

  const infoPop = (
    <Popover onClick={() => {
      showInfoInfo(false);
      localStorage.setItem('first_visit', false);
    }}>
      <Popover.Title as="h3">More information</Popover.Title>
      <Popover.Content>
        Click here to show or hide information about the calculations I performed on the data set to generate this visualization. Attributions for music can be found here. <br />
         
        <b>That's it!</b> <br />
        Enjoy my fun little creation. <br/>
        <small>Click to continue</small>
      </Popover.Content>
    </Popover>
  )


  return (
    <>
      <Overlay target={topLeft} show={dateInfo} placement="right">
        {datePop}
      </Overlay>
      <Overlay target={astInfo} show={astInfoState} placement="left">
        {astPop}
      </Overlay>
      <Overlay target={zen} show={zenInfo} placement="right">
        {zenPop}
      </Overlay>
      <Overlay target={info} show={infoInfo} placement="right">
        {infoPop}
      </Overlay>
    </>
  )
}

export default Intro;