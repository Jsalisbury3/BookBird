import React, { Component } from 'react';
import Index from './components/BookInfo/index';
import Images from './components/BookInfo/images';


class App extends Component {
  render() {
    return (
      <div>
          <Index/>
          <Images/>
      </div>
    );
  }
}

export default App;
