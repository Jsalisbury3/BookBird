import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import SignInValidation from './validation-signIn';
import {withRouter} from 'react-router-dom';
import './sign.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'
import axios from "axios/index";
import Header from './../universal/header'
import Nav from './../universal/nav'

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
            <Fragment>
                {/*<Header/>*/}
                    <div className="signin_container">
                        <h1 className="signInHeader">Sign in</h1>
                        <SignInValidation/>
                        <p className="signin_footer">Dont have an account? <Link to={"/SignUp"}>Sign up now! </Link> </p>
                    </div>
                {/*<Nav/>*/}
            </Fragment>
        )
    }
}

export default withRouter(Signin);