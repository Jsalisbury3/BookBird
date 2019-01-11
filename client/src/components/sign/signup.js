import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SignUpValidation from './validation-signUp'
import './sign.css'
// import 'materialize-css'
class Signup extends Component{
    render(){
        return(
        <div>
            <h1 className="sign_in">Sign Up</h1>
            <SignUpValidation />
            <p className="signup_footer">Already have an account? <Link to={"/SignIn"}> Sign In </Link></p>
        </div>

        )
    }
}

export default Signup




