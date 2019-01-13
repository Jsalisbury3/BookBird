import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SignUpValidation from './validation-signUp'
import './sign.css'
// import 'materialize-css'
class Signup extends Component{
    render(){
        return(
        <div className="signup_container">
            <h1 className="signUpHeader">Sign Up</h1>
            <SignUpValidation />
            <p className="signup_footer">Already have an account? <Link to={"/SignIn"}> Sign In </Link></p>
        </div>

        )
    }
}

export default Signup




