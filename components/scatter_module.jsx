import React from 'react';
import ScatterPlot from './scatter_plot';

const ScatterModule = props => (
  // only pass xAxis and yAxis labels to VisHeader to avoid
  // rerender with unnecessary prop changes
  <div className='module vis'>
    <VisHeader xAxis={props.xAxis} yAxis={props.yAxis}/>
    <ScatterPlot {...props}/>
  </div>
)

const VisHeader = props => {
  const { xAxis, yAxis } = props;
  return <header><h1>{xAxis}</h1><h3> vs </h3><h1>{yAxis}</h1></header>;
}

export default ScatterModule;
