import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SignInValidation from './validation-signIn';
import { getIdForToken} from '../../actions/sign_in';
import './sign.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'


class Signin extends Component{
    render(){
        return(
            <div>
                <h1 className="sign_in">Sign in</h1>
                <SignInValidation/>
                <p className="signin_footer">Dont have an account? <Link to={"/SignUp"}>Sign up now! </Link> </p>
            </div>
        )
    }
}

export default Signin