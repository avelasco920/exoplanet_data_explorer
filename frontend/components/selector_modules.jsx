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
      <div className='grid grid__2'>
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
        className='basic-single'
        classNamePrefix='select'
        isSearchable={true}
        autosize={false}
        onChange={ input => props.handleChange(axis, input) }
        name="color"
      />
      <BimmedHistogram {...props}/>
    </div>
  )
}








class BimmedHistogram extends React.Component {
  componentDidUpdate(prevProps) {
    const { axis } = this.props
    if (prevProps[`${axis}Axis`] !== this.props[`${axis}Axis`]) {
      this.getIntervals()
    }
  }

  updateData() {

    console.log(this.props);
    console.log(intervals);
  }

  getIntervals() {
    const { axis } = this.props;
    const max = this.props[`${axis}Max`];
    const min = this.props[`${axis}Min`];
    const intervalIncrement = (max - min) / 20;
    const intervals = [];
    let increment = min;
    while (increment < max) {
      intervals.push(`${increment-.1}-${increment + intervalIncrement}`);
      increment += intervalIncrement;
    }
    console.log(intervals);
    return intervals
  }

  render() {
    return(
      <div>

      </div>
    )
  }
}
















export default SelectorModules;
