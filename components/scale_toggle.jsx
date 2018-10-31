import React from 'react';

class ScaleToggle extends React.Component {
  isActive(scaleType) {
    const { axis } = this.props;
    return (this.props[`${axis}Scale`] === scaleType) ? 'option-active' : '';
  }

  render() {
    const { axis, toggleScaleType } = this.props;
    return (
      <div className='flex scale-options'>
        <span
          onClick={() => toggleScaleType(`${axis}Scale`, 'linear')}
          className={`option ${this.isActive('linear')}`}>
          Linear
        </span>
        <span
          onClick={() => toggleScaleType(`${axis}Scale`, 'logarithmic')}
          className={`option ${this.isActive('logarithmic')}`}>
          Logarithmic
        </span>
      </div>
    )
  }
}

export default ScaleToggle;
