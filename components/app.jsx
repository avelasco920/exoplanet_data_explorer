import React from 'react';
import Content from './content';
import csv from '../data/phl_hec_all_confirmed.csv';

class App extends React.Component {
  render() {
    return (
      <div className='app'>
        <Navbar />
        <Content />
      </div>
    );
  }
}

const Navbar = () => (
  <div className='navbar'>
    <h1 className='title'>Exoplanet Data Explorer</h1>
  </div>
)

export default App;
