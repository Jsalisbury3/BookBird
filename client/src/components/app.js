import React, {Component} from 'react';
import LandingPage from './landing';
import './landing/package';
import AddBook from './addBook';
import './addBook/package';
import BookInfo from './BookInfo';
import UserProfile from './user-profile';
import './user-profile/package';
import SignIn from './sign/signin';
import SignUp from './sign/signup';
import Nav from './universal/nav';
import Header from './universal/header';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Modal from './addBook/modal';



class App extends Component {
    render() {
        return (
            <Router>
                <div className="appContainer">
                    <div className="pageContainer">
                        <Header/>
                        <Route exact path={"/"} component={LandingPage}/>
                        <Route path={"/AddBook"} component={AddBook}/>
                        <Route path={"/BookInfoIndex/:bookId"} component={BookInfo}/>
                        <Route path={"/UserProfile"} component={UserProfile}/>
                        <Route path={"/SignIn"} component={SignIn}/>
                        <Route path={"/SignUp"} component={SignUp}/>
                        <Nav/>
                    </div>
                    <Modal/>
                </div>
            </Router>
        );
    }
}


export default App;


