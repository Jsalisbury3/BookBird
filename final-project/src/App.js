import React, {Component} from 'react';
import Index from './components/BookInfo/index';
// import Images from './components/BookInfo/images/51pw4Y1-iJL._SX388_BO1,204,203,200_';
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
import Modal from './components/addBook/modal';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="appContainer">
                    <div className="pageContainer">
                        <Header/>
                        <Route exact path={"/"} component={LandingPageIndex}/>
                        <Route path={"/AddBook"} component={AddBookIndex}/>
                        <Route path={"/BookInfoIndex/:bookId"} component={BookInfoIndex}/>
                        <Route path={"/AddBook/success"} component={Modal}/>
                        <Nav/>
                    </div>
                    <Modal/>
                </div>
            </Router>
        );
    }
}

export default App;
