import React, {Component} from 'react';
import Index from './BookInfo/index';
import Images from './BookInfo/images';
import LandingPageIndex from './landing/index';
import AddBookIndex from './addBook/index';
import BookInfoIndex from './BookInfo/index'
import './universal/universal.css';
import './landing/landing.css';
import './addBook/addBook.css';
import './BookInfo/book-data.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Nav from './universal/nav';
import Header from './universal/header';




class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route exact path={"/"} component={LandingPageIndex}/>
                    <Route path={"/AddBook"} component={AddBookIndex}/>
                    <Route path={"/BookInfoIndex"} component={BookInfoIndex}/>
                    <Nav/>
                </div>
            </Router>
        );
    }
}

export default App;
