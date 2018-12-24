import React, { Component } from 'react';
import LandingPageIndex from './components/landing/index';
import './components/universal/universal.css';
import './components/landing/landing.css';

import Index from './components/addBook/index'



class App extends Component {
  render() {
    return (

      <LandingPageIndex/>

      <Index/>

    );
  }
}

export default App;
