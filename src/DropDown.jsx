import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
const formatDate = require('../controllers/helpers');

const DropDown = ({update}) => {
  const [date, changeDate] = useState(formatDate(new Date(Date.now())));
  const [validDate, toggleValidDate] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
      if (!validDate) {
        return;
      }
      update(date);
    }
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control required type="text" 
          isValid={validDate}
          isInvalid={!validDate}
          placeholder={formatDate(new Date(Date.now()))}
          value={date} onChange={e => {
            changeDate(e.target.value);
            toggleValidDate(!/^[0-9]{4}\-[0-9]{2}\-[0-9]$/.test(e.target.value));
          }} />
        <Form.Control.Feedback type="invalid">Please enter in the YYYY-MM-DD format</Form.Control.Feedback>
      </Form.Group>
      <Button variant="secondary" size="sm" onClick={handleSubmit}>Explore</Button>
    </Form>
  )
}

export default DropDown;