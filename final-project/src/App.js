import React, { Component } from 'react';
import Index from './components/BookInfo/index';
import Images from './components/BookInfo/images';
import LandingPageIndex from './components/landing/index';
import AddBookIndex from './components/addBook/index';
import './components/universal/universal.css';
import './components/landing/landing.css';
import './components/addBook/addBook.css';






class App extends Component {
  render() {
    return (
      <div>
          <LandingPageIndex/>
          <Index/>
          <Images/>
          <AddBookIndex/>
      </div>
    );
  }
}

export default App;
