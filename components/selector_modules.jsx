import React from 'react';
import Select from 'react-select';
import csv from '../data/phl_hec_all_confirmed.csv';
import BinnedHistogram from './binned_histogram';

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
        onChange={ input => props.updateLabel(axis, input) }
        name='color'
      />
      <ScaleOptions {...props}/>
      <Warning {...props}/>
      <BinnedHistogram numBars={30} {...props}/>
    </div>
  )
}



class ScaleOptions extends React.Component {
  isActive(scaleType) {
    const { axis } = this.props;
    return (this.props[`${axis}Scale`] === scaleType) ? 'option-active' : '';
  }

  render() {
    const { axis, updateParams } = this.props;
    return (
      <div className='flex scale-options'>
        <span
          onClick={() => updateParams(`${axis}Scale`, 'linear')}
          className={`option ${this.isActive('linear')}`}>
          Linear
        </span>
        <span
          onClick={() => updateParams(`${axis}Scale`, 'logarithmic')}
          className={`option ${this.isActive('logarithmic')}`}>
          Logarithmic
        </span>
      </div>
    )
  }
}



class Warning extends React.Component {
  warning() {
    const { axis } = this.props;
    const scale = this.props[`${axis}Scale`];
    const label = this.props[`${axis}Axis`];
    const labelsWNegVals = [
      'P. Mag',
      'S. [Fe/H]',
      'S. DEC (deg)',
      'S. Mag from Planet',
      'P. HZD',
      'P. HZC',
      'P. HZA',
    ]
    if (labelsWNegVals.includes(label) && scale === 'logarithmic') {
      return 'This feature contains negative values that are only visible in linear view.'
    } else {
      return '';
    }
  }

  render() {
    return (
      <div className='warning'>
        <span>{this.warning()}</span>
      </div>
    )
  }
}




export default SelectorModules;
