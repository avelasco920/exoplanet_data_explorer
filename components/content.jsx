import React from 'react';
import SelectorModules from './selector_modules';
import ScatterModule from './scatter_module';
import csv from '../data/phl_hec_all_confirmed.csv';

class Content extends React.Component {
  constructor() {
    super()
    this.state = {
      dataPoints: [],
      xAxis: 'P. Min Mass (EU)',
      yAxis: 'P. Radius (EU)',
      xScale: 'linear',
      yScale: 'linear',
      planetFeatures: this.getPlanetsFeatures()
    }
    // binding functions that are called in other components
    //  and directly makes a change to this component
    this.updateFeature = this.updateFeature.bind(this);
    this.updateParams = this.updateParams.bind(this);
  }

  componentDidMount() {
    const { xAxis, yAxis } = this.state;
    const data = this.getData(xAxis, yAxis);
    this.setState({
      dataPoints: data.dataPoints,
      xMax: data.xMax,
      xMin: data.xMin,
      yMax: data.yMax,
      yMin: data.yMin,
    })
  }

  updateParams(property, value) {
    this.setState({[property]: value});
  }

  getData(x, y) {
    let xMax = 0, xMin = 0, yMax = 0, yMin = 0
    // returns an array of objects(data points)
    const dataPoints = csv.map(line => {
      // taking down mins and maxes used for binned diagram in ./selector_modules.jsx
      if (xMax < line[x]) xMax = line[x];
      if (xMin > line[x]) xMin = line[x];
      if (yMax < line[y]) yMax = line[y];
      if (yMin > line[y]) yMin = line[y];

      // returns an object with x and y data points
      const selection = {};
      selection['x'] = line[x];
      selection['y'] = line[y];
      return selection;
    })
    return { dataPoints, xMax, xMin, yMax, yMin }
  }

  updateFeature(axis, dropdownInput) {
    const feature = dropdownInput.value;
    let xAxis, yAxis

    switch(axis) {
      case 'x':
        xAxis = feature;
        yAxis = this.state['yAxis'];
        break;
      case 'y':
        yAxis = feature;
        xAxis = this.state['xAxis'];
        break;
    }

    // query the csv for datapoints
    let data = this.getData(xAxis, yAxis);

    this.setState({
      dataPoints: data.dataPoints,
      xMax: data.xMax,
      xMin: data.xMin,
      yMax: data.yMax,
      yMin: data.yMin,
      xAxis,
      yAxis
    })
  }

  getPlanetsFeatures() {
    let planetFeatures = Object.keys(csv[0]);

    // ignore collumns that aren't numerical values
    const nonNumVals = [
      'P. Name',
      'P. Name Kepler',
      'P. Zone Class',
      'P. Mass Class',
      'P. Composition Class',
      'P. Atmosphere Class',
      'P. Habitable Class',
      'S. Name',
      'S. Name HD',
      'S. Name HIP',
      'S. Constellation',
      'S. Type',
      'P. Disc. Method',
      'P. Max Mass (EU)'
    ]
    planetFeatures = planetFeatures.filter(feature => !nonNumVals.includes(feature))

    // return planetFeatures in an array of objects for select dropdown format
    return planetFeatures.map(el => {
      const obj = {};
      obj['value'] = el;
      obj['label'] = el;
      return obj;
    })
  }

  getWarning(axis) {
    const scale = this.state[`${axis}Scale`];
    const feature = this.state[`${axis}Axis`];
    const featuresWNegVals = [
      'P. Mag',
      'S. [Fe/H]',
      'S. DEC (deg)',
      'S. Mag from Planet',
      'P. HZD',
      'P. HZC',
      'P. HZA',
    ]
    if (featuresWNegVals.includes(feature) && scale === 'logarithmic') {
      return 'This feature contains negative values that are only visible in linear view.'
    } else {
      return '';
    }
  }

  render() {
    const { xAxis, yAxis } = this.state;
    return (
      <div className='content'>
        <SelectorModules
          selectOnChange={this.updateFeature}
          toggleScaleType={this.updateParams}
          options={this.state.planetFeatures}
          defaultXValue={{ label: xAxis, value: xAxis }} // default value for x-axis dropdown
          defaultYValue={{ label: yAxis, value: yAxis }} // default value for y-axis dropdown
          histogramBarCount={30}
          xWarning={this.getWarning('x')}
          yWarning={this.getWarning('y')}
          // passing down state as props so SelectorModules
          // have access to axis planetFeatures and dataPoints
          {...this.state}
        />
        <ScatterModule {...this.state}/>
      </div>
    )
  }
}

export default Content;
