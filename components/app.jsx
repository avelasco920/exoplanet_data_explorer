import React from 'react';
import SelectorModules from './selector_modules';
import VisualizationModule from './visualization_module';
import csv from '../data/phl_hec_all_confirmed.csv';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Navbar />
        <Content />
      </div>
    );
  }
}



const Navbar = () => (
  <div className='navbar'>
    <h1 className='title'>Exoplanet Data Explorer</h1>
  </div>
)




class Content extends React.Component {
  constructor() {
    super()
    this.state = {
      dataPoints: [],
      xAxis: 'P. Min Mass (EU)',
      yAxis: 'P. Radius (EU)',
      xScale: 'linear',
      yScale: 'linear'
    }
    // binding functions that are called in other components
    //  and directly makes a change to this component
    this.updateLabel = this.updateLabel.bind(this);
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

  updateLabel(axis, input) {
    const label = input.value;
    let xAxis, yAxis

    switch(axis) {
      case 'x':
        xAxis = label;
        yAxis = this.state['yAxis'];
        break;
      case 'y':
        yAxis = label;
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

  render() {
    return (
      <div className='content'>
        <SelectorModules
          updateLabel={this.updateLabel}
          updateParams={this.updateParams}
          // passing down state as props so SelectorModules
          // have access to axis labels and dataPoints
          {...this.state}
        />
        <VisualizationModule {...this.state} />
      </div>
    )
  }
}


export default App;
