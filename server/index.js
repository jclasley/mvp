const express = require('express');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/api/asteroids/:date', (req, res) => {
  
})

app.listen(3000);