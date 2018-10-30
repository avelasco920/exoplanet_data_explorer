import React from 'react';
import Select from 'react-select';
import csv from '../../data/phl_hec_all_confirmed.csv';
import lodash from 'lodash';

class SelectorModules extends React.Component {
  constructor(props) {
    super(props);
    this.state = { labels: [] }
  }

  componentDidMount() {
    // get labels from csv file
    const labels = this.getLabels();
    this.setState({ labels })
  }

  getLabels() {
    let labels = Object.keys(csv[0]);

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
    labels = labels.filter(label => !nonNumVals.includes(label))

    // return labels in an array of objects for select dropdown format
    return labels.map(el => {
      const obj = {};
      obj['value'] = el;
      obj['label'] = el;
      return obj;
    })
  }

  render() {
    return (
      <div className='flex'>
        <SelectorModule
          axis='x'
          options={this.state.labels}
          {...this.props}
        />
        <SelectorModule
          axis='y'
          options={this.state.labels}
          {...this.props}
        />
      </div>
    )
  }
}







const SelectorModule = props => {
  const { axis, options } = props;
  return (
    <div className='selector module'>
      <h3 className='header'>{axis.toUpperCase()}-Axis</h3>
      <Select
        options={options}
        defaultValue={{ label: props[`${axis}Axis`], value: props[`${axis}Axis`] }}
        className='basic-single'
        classNamePrefix='select'
        isSearchable={true}
        autosize={false}
        onChange={ input => props.handleChange(axis, input) }
        name='color'
      />
      <BinnedHistogram numBars={30} {...props}/>
    </div>
  )
}








class BinnedHistogram extends React.Component {
  constructor(props) {
    super(props);
    this.state = { distribution: [], intervals: [] };
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate(prevProps) {
    const { dataPoints } = this.props
    // if dataPoints change, update data for histogram
    if (!lodash.isEqual(prevProps.dataPoints, dataPoints)) {
      this.updateData();
    }
  }

  createChart() {
    const { axis } = this.props;
    const ctx = document.getElementById(`${axis}-histogram`);
    var stackedBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.state.intervals,
        datasets: [{
          backgroundColor: '#2684ff',
          hoverBackgroundColor: '#2684ff',
          data: this.state.distribution
        }]
      },
      options: {
        legend: {
          display: false,
        },
        axisY: {lineThickness: 1},
        scales: {
          scaleLineColor: 'transparent',
          xAxes: [{
            stacked: true,
            barThickness : 8,
            gridLines : { color: 'white' },
            ticks: { fontColor: '#c4c4c4' },
          }],
          yAxes: [{
            stacked: true,
            gridLines : { color: '#f3f3f3' },
            ticks: { fontColor: '#c4c4c4' },
          }]
        }
      }
    });
    this.setState({chart: stackedBar})
  }

  updateData() {
    const intervalIncrement = this.getIncrement();
    const intervals = this.getIntervals(intervalIncrement);
    const distribution = this.getDistribution(intervals);

    // update chart if chart has already been created
    if (this.state.chart) this.updateChart(distribution, intervals);

    this.setState({ intervals, distribution }, () => console.log(this.state) )
  }

  updateChart(distribution, intervals) {
    const chart = this.state.chart;
    // changes the data to the updated points
    chart.data.datasets[0].data = distribution;

    // forces a rerender for the chart
    chart.update();

    // threre's a glitch in the library and need to set timeout in order
    // to change scale labels when selection has changed
    setTimeout(() => {
      chart.data.labels = intervals;
      chart.update();
    }, 0);
  }

  getDistribution(intervals) {
    const { dataPoints, axis, numBars } = this.props;

    // create an empty array of length 10 with values of 0
    // to correllate to the array of intervals
    let distribution = new Array(numBars);
    distribution = distribution.fill(0);

    // increment count in distribution array at correllating intervals index
    // where the dataPoint value falls within the interval range
    // time complexity:  O{n) time
    dataPoints.forEach(point => {
      point = point[axis];
      if (point === null) return; // break out of function if point is null;
      let i = 0;
      while (i < intervals.length || point < intervals[i] ) {
        // if first interval, set the range floor to 0
        const intervalBefore = intervals[i-1] ? intervals[i-1] : 0;
        if (point <= intervals[i] && point > intervalBefore) distribution[i] += 1
        i ++;
      }
    })
    return distribution;
  }

  getIncrement() {
    // returns individual value that each range is incremented by
    const { axis, numBars } = this.props;
    const max = this.props[`${axis}Max`];
    const min = this.props[`${axis}Min`];
    return this.roundToTwo((max - min) / numBars);
  }

  roundToTwo(num) {
    // would typically have this in a util/parsing file since this
    // shouldn't be an object specific function
    return +(num.toFixed(2));
  }

  getIntervals(intervalIncrement) {
    const { axis, numBars } = this.props;
    const intervals = [],
          min = this.props[`${axis}Min`];
    // range start from min instead of 0 in case range is less than 0
    let   intervalCeil = min + intervalIncrement,
          i = 1;

    // create the array of intervals
    while (i <= numBars) {
      intervals.push(this.roundToTwo(intervalCeil));
      intervalCeil += intervalIncrement;
      i ++;
    }
    return intervals
  }

  render() {
    const { axis } = this.props;
    return(
      <div className='histogram'>
        <h4>Distribution Histogram of {this.props[`${axis}Axis`]}</h4>
        <canvas id={`${axis}-histogram`} height={'80px'}/>
      </div>
    )
  }
}
















export default SelectorModules;
