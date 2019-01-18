import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SignInValidation from './validation-signIn';
import {withRouter} from 'react-router-dom';
import './sign.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'
import axios from "axios/index";


class Signin extends Component{

    componentDidMount = () => {
        if(localStorage.Token) {
            this.props.history.push('/UserProfile');
        }
    }
//     handleSignInInput = (event) => {
//
// }

    render(){
        return(
            <div className="signin_container">
                <h1 className="signInHeader">Sign in</h1>
                <SignInValidation/>
                <p className="signin_footer">Dont have an account? <Link to={"/SignUp"}>Sign up now! </Link> </p>
            </div>
        )
    }
}

export default withRouter(Signin);