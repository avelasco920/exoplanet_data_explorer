const express = require('express')
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const path = require('path');
const compiler = webpack(config);
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/index.html'));
});

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Exoplanet Data Explorer listening on port ${port}!`)
});
