import React from 'react';
import Content from './content'
import Navbar from './navbar';

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
export default App;
