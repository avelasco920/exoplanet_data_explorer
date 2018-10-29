import React from 'react';
import Select from 'react-select';
import csv from '../../data/phl_hec_all_confirmed.csv';

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
    const nonNumVals = [
      'P. Name',
      'P. Name Kepler',
      'P. Name KOI',
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
      'P. Disc. Method'
    ]
    labels = labels.filter(label => !nonNumVals.includes(label))
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
          handleChange={this.props.handleChange}
        />
        <SelectorModule
          axis='y'
          options={this.state.labels}
          handleChange={this.props.handleChange}
        />
      </div>
    )
  }
}



const SelectorModule = props => {
  const { axis, options } = props;
  return (
    <div className='selector'>
      <h3 className='header'>{axis.toUpperCase()}-Axis</h3>
      <Select
        options={options}
        className="basic-single"
        classNamePrefix="select"
        isSearchable={true}
        autosize={false}
        onChange={ props.handleChange(axis) }
        name="color"
      />
    </div>
  )
}

export default SelectorModules;
