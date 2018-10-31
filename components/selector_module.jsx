import React from 'react';
import Select from 'react-select';
import ScaleToggle from './scale_toggle';
import Warning from './warning';
import BinnedHistogram from './binned_histogram';

const SelectorModule = props => {
  const { axis, options, defaultValue } = props;
  return (
    <div className='selector module'>
      <h3 className='header'>{axis.toUpperCase()}-Axis</h3>
      <Select
        options={options}
        defaultValue={defaultValue}
        className='basic-single'
        classNamePrefix='select'
        isSearchable={true}
        autosize={false}
        onChange={ input => props.selectOnChange(axis, input) }
      />
      <ScaleToggle {...props}/>
      <Warning {...props}/>
      <BinnedHistogram {...props}/>
    </div>
  )
}

export default SelectorModule;
