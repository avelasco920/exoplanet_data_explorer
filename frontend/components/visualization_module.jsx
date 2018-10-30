import React from 'react';
import Chart from 'chart.js';
import lodash from 'lodash';

class VisualizationModule extends React.Component {
  render() {
    const { xAxis, yAxis, dataPoints } = this.props;
    return (
      <div className='module vis'>
        <header><h1>{xAxis}</h1><h3> vs </h3><h1>{yAxis}</h1></header>
        <ScatterPlot {...this.props}/>
      </div>
    )
  }
}





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
    const { dataPoints, xAxis, yAxis } = this.props;
    // does a deep check to see if the points in the chart has changed
    if ( !lodash.isEqual(prevProps.dataPoints, dataPoints) ) {
      const chart = this.state.chart;
      // changes the data to the updated points
      chart.data.datasets[0].data = this.props.dataPoints;
      // forces a rerender for the chart
      chart.update();

      // threre's a glitch in the library and need to set timeout in order
      // to change scale labels when selection has changed
      setTimeout(() => {
        chart.options.scales.xAxes[0].scaleLabel.labelString = xAxis;
        chart.options.scales.yAxes[0].scaleLabel.labelString = yAxis;
        chart.update();
      }, 0);
    }
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
              type: 'logarithmic',
              position: 'bottom',
              scaleLabel: {
                labelString: this.props.xAxis,
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
              type: 'logarithmic',
              scaleLabel: {
                labelString: this.props.yAxis,
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

export default VisualizationModule;
