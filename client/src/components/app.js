import React, {Component} from 'react';
import axios from 'axios';
import LandingPage from './landing';
import './landing/package';
import AddBook from './addBook';
import IntroPage from './intro-page/introPage';
import './addBook/package';
import BookData from './BookInfo/bookData';
import './BookInfo/package';
import UserProfile from './user-profile/profile';
import './user-profile/package';
import SignIn from './sign/signin';
import SignUp from './sign/signup';
import Nav from './universal/nav';
import Header from './universal/header';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
// import Modal from './addBook/modal';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import {BASE_URL_GOOGLE_BOOKS, API_KEY} from '../../../config/api'




class App extends Component {

    render() {
        return (
            <Router>
                <div className="appContainer">
                    <div className="pageContainer">
                         <Header />
                        <Route exact path={"/"} component={IntroPage}/>
                        <Route path={"/Landing"} component={LandingPage}/>
                        <Route path={"/AddBook"} component={AddBook}/>                        
                        <Route path={"/BookInfoIndex/:bookId"} component={BookData}/>
                        <Route path={"/UserProfile"} component={UserProfile}/>
                        <Route path={"/SignIn"} component={SignIn}/>
                        <Route path={"/SignUp"} component={SignUp}/>
                         <Nav/>
                    </div>
                </div>
            </Router>
        );
    }
}


export default App;


