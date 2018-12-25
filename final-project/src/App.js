import React, { Component } from 'react';
import LandingPageIndex from './components/landing/index';
import './components/universal/universal.css';
import './components/landing/landing.css';
import AddBookIndex from './components/addBook/index'




class App extends Component {
  render() {
    return (
      <div>
        <AddBookIndex/>
        <LandingPageIndex/>
      </div>
    );

  }
}

export default App;
