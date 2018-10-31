# Exoplanet Data Explorer

Exoplanet Data Explorer is a dynamic single-app visualization tool for users to compare the distribution of values in the Planetary Habitability Laboratory dataset.

### Features

- Scatter plot with each point representing one planet comparing two features of the planet in either axis
- Dropdown to switch features being compared
- Binned histogram representing the distribution of data for each axis
- Ability to toggle to switch between linear or logarithmic scale for each axis
- User warning when a feature selected contains negative values that cannot be shown in logarithmic scale view

### Technologies

- React
- HTML5
- CSS3
- Sass
- Webpack
- Babel
- ES6
- Lodash
- Papaparse
- Chart.js
- React-Select
- Express

## Component Architecture

### Reusability

The architecture of components was written with the intention of reusability by being able to pass data and functions down from abstracted components.

- `<Content/>` contains the main logic to grab the data and pass it down to the appropriate components. When data changes in this component (either within itself or from a child component), the updated data is passed down to both the `<SelectorModules/>` and `<ScatterModule/>`
- The `<SelectorModules/>` component renders two modules that are responsible for changing axes options in the `<ScatterModule />`
- `<ScatterModule/>` takes in datapoints and scale view options and alters the scatter plot accordingly

## Setup
- `$ npm install` Install node modules
- `$ npm start` Run script to start express server and run webpack
- open `http://localhost:8080` in browser
