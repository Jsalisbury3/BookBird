import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import SignInValidation from './validation-signIn';
import {withRouter} from 'react-router-dom';
import './sign.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'
import axios from "axios/index";
import logo from "../intro-page/images/BookBirdOnlyImgWhite.png";


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
            
            <div className="signin_container col m6 offset-m3">
                {/* <div className='signin-logo-container'>
                    <img src={logo}/>
                </div> */}
                <h6 className="SignInHeader col s12 m12 l12 center-align">Sign In</h6>
                <SignInValidation/>
                <p className="col center-align l12 m12 s12 grey-text signin_footer">Dont have an account? <Link className='yellow-text text-darken-2' to={"/SignUp"}>Sign up now! </Link> </p>
            </div>


        )
    }
}

export default withRouter(Signin);