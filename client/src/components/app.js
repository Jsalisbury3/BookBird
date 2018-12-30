import React, {Component} from 'react';
import Index from './BookInfo/index';
import Images from './BookInfo/images';
import LandingPage from './landing';
import './landing/package';
import AddBook from './addBook';
import './addBook/package'
import BookInfo from './BookInfo'
import Nav from './universal/nav';
import Header from './universal/header';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';





class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route exact path={"/"} component={LandingPage}/>
                    <Route path={"/AddBook"} component={AddBook}/>
                    <Route path={"/BookInfoIndex"} component={BookInfo}/>
                    <Nav/>
                </div>
            </Router>
        );
    }
}

export default App;
