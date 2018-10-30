import React from 'react';
import Chart from 'chart.js';
import lodash from 'lodash';

class VisualizationModule extends React.Component {
  render() {
    const { xAxis, yAxis, points } = this.props;
    // don't display chart until x and y labels have been selected
    if (!xAxis || !yAxis) {
      return (
        <div className='module'>
          <h3>Please select X and Y axis labels</h3>
        </div>
      )
    } else {
      return (
        <div className='module vis'>
          <h1>{xAxis} vs {yAxis}</h1>
          <ScatterPlot {...this.props}/>
        </div>
      )
    }
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
    // does a deep check to see if the points in the chart has changed
    if ( !lodash.isEqual(prevProps.points, this.props.points) ) {
      const chart = this.state.chart;
      // changes the data to the updated points
      chart.data.datasets[0].data = this.props.points;
      // forces a rerender for the chart
      chart.update();
    }
  }

  createPlot() {
    console.log('max 5 ticks');
    const ctx = document.getElementById('ctx').getContext('2d');
    return new Chart(ctx, {
      type: 'scatter',
        data: {
          datasets: [{
            label: 'Scatter Dataset',
            data: this.props.points,
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
