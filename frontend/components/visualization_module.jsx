import React from 'react';
import ScatterPlot from './scatter_plot';

class VisualizationModule extends React.Component {
  render() {
    const { xAxis, yAxis, points } = this.props;
    if (!xAxis || !yAxis) return null;
    return(
      <div className='module'>
        <h3>{xAxis} vs {yAxis}</h3>
        <ScatterPlot points={points}/>
      </div>
    )
  }
}

export default VisualizationModule;
