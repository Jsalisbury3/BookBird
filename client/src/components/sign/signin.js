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

    render(){
        return(
            <div className="signin_container">
                <h1 className="signInHeader">Sign in</h1>
                <form className="sign_in_form" onSubmit={this.getIdForToken}>
                    <div className='input-field'>                      
                        <input className="signInInput" name = "email" type="text" onChange={this.handleInputs}/>
                        <label className="signInLabel"htmlFor="email">Email</label>
                        <div className="signInError"></div>
                    </div>
                    <div className="input-field">
                        <input className="signInInput"  name = "password"  type="password" onChange={this.handleInputs} />
                        <label className="signInLabel"htmlFor="password">Password</label>
                        <div className="signInError"></div>
                    </div>
                    
                    <button type="button" onClick={this.getIdForToken} className=" btn-large button sign-in-button">Sign in</button>
                    <p className="signin_footer">Dont have an account? <Link to={"/SignUp"}>Sign up now! </Link> </p>
                </form>
                <SignInValidation/>
            </div>
        )
    }
}

export default withRouter(Signin);