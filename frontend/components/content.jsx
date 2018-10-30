import React from 'react';
import SelectorModules from './selector_modules';
import VisualizationModule from './visualization_module';
import csv from '../../data/phl_hec_all_confirmed.csv';

class Content extends React.Component {
  constructor() {
    super()
    this.state = {
      points: [],
      xAxis: '',
      yAxis: ''
    }
    this.updateAxisSelection = this.updateAxisSelection.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { xAxis, yAxis } = this.state;
    if (prevState['xAxis'] !== xAxis || prevState['yAxis'] !== yAxis) {
      const points = this.updatePoints(xAxis, yAxis);
    }
  }

  updatePoints(x, y) {
    const points = csv.map(line => {
      const selection = {};
      selection['x'] = line[x];
      selection['y'] = line[y];
      return selection;
    })
    this.setState({points}, () => console.log(this.state))
  }

  updateAxisSelection(axis) {
    return (input) => {
      this.setState({[`${axis}Axis`]: input.value})
    }
  }

  render() {
    return (
      <div className='content'>
        <SelectorModules handleChange={this.updateAxisSelection} />
        <VisualizationModule
          xAxis={this.state.xAxis}
          yAxis={this.state.yAxis}
          points={this.state.points}
        />
      </div>
    )
  }
}

export default Content;
