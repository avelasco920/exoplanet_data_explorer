import React from 'react';
import Chart from 'chart.js';
import lodash from 'lodash';

class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { chart: null }
  }

  componentDidMount() {
    const chart = this.createPlot();
    this.setState({chart}, () => console.log(this.state))
  }

  componentDidUpdate(prevProps) {
    // does a deep check to see if the points in the chart has changed
    if ( !lodash.isEqual(prevProps.points, this.props.points) ) {
      const chart = this.state.chart;
      // changes the data to the updated points
      chart.data.datasets[0].data = this.props.points;
      // forces a rerender for the chart
      console.log('updating chart');
      chart.update();
    }
  }

  createPlot() {
    const ctx = document.getElementById('ctx').getContext("2d");
    return new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: this.props.points
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom'
                }]
            }
        }
    });
  }

  render() {
    return (
      <canvas id='ctx'/>
    )
  }
}

export default ScatterPlot
