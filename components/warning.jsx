import React from 'react';

const Warning = props => {
  const { axis } = props;
  return (
    <div className='warning'>
      <span>{props[`${axis}Warning`]}</span>
    </div>
  )
}

export default Warning;
