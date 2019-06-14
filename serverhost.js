const express = require('express')
const path = require('path');
const app = express();
require('dotenv').config()

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Exoplanet Data Explorer listening on port ${port}!`)
});
