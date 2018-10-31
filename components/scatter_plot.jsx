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
    // hold reference to chart in local state to update when new data comes in
    this.setState({ chart })
  }

  componentDidUpdate(prevProps) {
    const { dataPoints, xScale, yScale } = this.props;
    if (prevProps.xScale !== xScale) {
      // toggle X Axis scale type between linear and logarithmic
      this.updateScaleType('x', xScale);
    } else if (prevProps.yScale !== yScale) {
      // toggle Y Axis scale type between linear and logarithmic
      this.updateScaleType('y', yScale);
    } else if ( !lodash.isEqual(prevProps.dataPoints, dataPoints) ) {
      // does a deep check to see if the points in the chart has changed
      this.updateDataPoints();
    }
  }

  updateScaleType(axis, scaleType) {
    const { chart } = this.state;
    chart.options.scales[`${axis}Axes`][0].type = scaleType;
    chart.update();
  }

  updateDataPoints() {
    const { dataPoints, xAxis, yAxis } = this.props;
    const { chart } = this.state;

    // changes the data to the updated points
    chart.data.datasets[0].data = dataPoints;
    // forces a rerender for the chart
    chart.update();

    // threre's a glitch in the library and need to set timeout in order
    // to change scale features when selection has changed
    setTimeout(() => {
      chart.options.scales.xAxes[0].scaleFeature.featureString = xAxis;
      chart.options.scales.yAxes[0].scaleFeature.featureString = yAxis;
      chart.update();
    }, 0);
  }

  createPlot() {
    const ctx = document.getElementById('ctx').getContext('2d');
    return new Chart(ctx, {
        type: 'scatter',
        data: {
          datasets: [{
            // dataPoints received from local state in content component
            data: this.props.dataPoints,
            pointBackgroundColor: 'rgba(255, 255, 255, .3)',
            pointHoverBackgroundColor: 'rgba(255, 255, 255, .8)',
            pointBorderColor: 'rgba(255, 255, 255, .8)',
          }]
        },
        options: {
          legend: {
              display: false
          },
          scales: {
            xAxes: [{
              type: this.props.xScale,
              position: 'bottom',
              scaleFeature: {
                featureString: this.props.xAxis,
                fontColor: 'white',
                display: true
              },
              gridLines : {
                color: 'rgba(255, 255, 255, .3)',
                fontColor: 'white',
              },
              ticks: {
                fontColor: 'white',
                autoSkip: true,
                maxTicksLimit: 5,
                // when using logarithmic scales, ticks are
                // in scientific notation. need to stringify
                callback: (tick) => tick.toLocaleString()
              }
            }],
            yAxes: [{
              type: this.props.yScale,
              scaleFeature: {
                featureString: this.props.yAxis,
                fontColor: 'white',
                display: true
              },
              gridLines : {
                color: 'rgba(255, 255, 255, .3)',
                fontColor: 'white',
              },
              ticks: {
                fontColor: 'white',
                autoSkip: true,
                maxTicksLimit: 5,
                // when using logarithmic scales, ticks are
                // in scientific notation. need to stringify
                callback: (tick) => tick.toLocaleString()
              }
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


export default ScatterPlot;
