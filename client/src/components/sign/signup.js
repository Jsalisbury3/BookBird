import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SignUpValidation from './validation-signUp'
import './sign.css'
import logo from "../intro-page/images/BookBirdOnlyImgWhite.png";

// import 'materialize-css'


class Signup extends Component {

    componentDidMount = () => {
        if (localStorage.Token) {
            this.props.history.push('/UserProfile');
        }
    }

    render() {
        return (
            <div className="signup_container col m6 offset-m3">
                {/* <div className='signup-logo-container'>
                    <img src={logo}/>
                </div> */}
                 <h6 className="SignUpHeader col s12 m12 l12 center-align">Sign Up</h6>
                <SignUpValidation/>
                <p className="grey-text signup_footer col s12 m12 l12 center-align">Already have an account? <Link className='yellow-text text-darken-2' to={"/SignIn"}> Sign In </Link></p>
            </div>
        )
    }
}

export default Signup




