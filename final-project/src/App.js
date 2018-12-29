import React, {Component} from 'react';
import Index from './components/BookInfo/index';
import Images from './components/BookInfo/images';
import LandingPageIndex from './components/landing/index';
import AddBookIndex from './components/addBook/index';
import BookInfoIndex from './components/BookInfo/index'
import './components/universal/universal.css';
import './components/landing/landing.css';
import './components/addBook/addBook.css';
import './components/BookInfo/book-data.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Nav from './components/universal/nav';
import Header from './components/universal/header';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route exact path={"/"} component={LandingPageIndex}/>
                    <Route path={"/AddBook"} component={AddBookIndex}/>
                    <Route path={"/BookInfoIndex/:bookId"} component={BookInfoIndex}/>
                    <Nav/>
                </div>
            </Router>
        );
    }
}

export default App;
