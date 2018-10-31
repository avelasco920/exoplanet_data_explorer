import React from 'react';
import SelectorModule from './selector_module';

const SelectorModules = props => {
  const { options, defaultXValue, defaultYValue } = props;
  return (
    <div className='flex'>
      <SelectorModule
        axis='x'
        options={options}
        defaultValue={defaultXValue}
        {...props}
      />
      <SelectorModule
        axis='y'
        options={options}
        defaultValue={defaultYValue}
        {...props}
      />
    </div>
  )
}

export default SelectorModules;
