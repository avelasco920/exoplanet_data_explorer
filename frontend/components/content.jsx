import React from 'react';
import SelectorModules from './selector_modules';
import VisualizationModule from './visualization_module';
import csv from '../../data/phl_hec_all_confirmed.csv';

class Content extends React.Component {
  constructor() {
    super()
    this.state = {
      dataPoints: [],
      xAxis: 'P. Min Mass (EU)',
      yAxis: 'P. Radius (EU)'
    }
    // binding handleChange becuase the function is called in
    // a selector module and it directly makes a change to the Content component
    this.handleChange = this.handleChange.bind(this);
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

  getData(x, y) {
    let xMax = 0, xMin = 0, yMax = 0, yMin = 0
    // returns an array of objects(data points)
    const dataPoints = csv.map(line => {
      // taking down mins and maxes for binned diagram in ./selector_modules.jsx
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

  handleChange(axis, input) {
    let xAxis, yAxis;
    if (axis === 'x') {
      xAxis = input.value;
      yAxis = this.state['yAxis']
    } else {
      yAxis = input.value;
      xAxis = this.state['xAxis'];
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

  render() {
    return (
      <div className='content'>
        <SelectorModules
          handleChange={this.handleChange}
          // passing down state as props so SelectorModules
          // have access to axis labels and dataPoints
          {...this.state}
        />
        <VisualizationModule
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          dataPoints={this.state.dataPoints}
        />
      </div>
    )
  }
}

export default Content;
