import React from 'react';
import SelectorModule from './selector_module';
const parse = require('csv-parse/lib/sync')
import csv from '../../data/phl_hec_all_confirmed.csv'

class Content extends React.Component {
  componentDidMount() {
    const records = csv.map(line => {
      const selection = {};
      selection['S. Distance (pc)'] = line['S. Distance (pc)'];
      selection['P. Teq Max (K)'] = line['P. Teq Max (K)'];
      return selection;
    })
    console.log(records);
  }

  render() {
    <div className='content'>
      <div className='grid__2'>
        <SelectorModule/>
        <SelectorModule/>
      </div>
    </div>
  }
}

export default Content;
