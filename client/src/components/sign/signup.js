import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SignUpValidation from './validation-signUp'
import './sign.css'
// import 'materialize-css'
class Signup extends Component{
    render(){
        return(
        <div className="signup_container">
            <p className="signup_footer">Already have an account? <Link to={"/SignIn"}> Sign In </Link></p>
            <h1 className="signUpHeader">Sign Up</h1>
            <form onSubmit={this.validateContactForm} className="sign_up_form">
                <div className="input-field">
                    
                    <input className="signUpInput"name = "Email"type="text"/>
                    <label className="signUpLabel" htmlFor="Email">Email</label>
                    <div className="signUpError"></div>
                </div>
                <div className="input-field">
                    <input className="signUpInput"name = "password"type="password"/>
                    <label className="signUpLabel" htmlFor="password">Password</label>
                    <div className="signUpError"></div>

                </div> 
                <div className="input-field">
                    <input className="signUpInput"name = "Name"type="text"/>
                    <label className="signUpLabel"htmlFor="Name">Name</label>
                    <div className="signUpError"></div>
                </div>
               
                <button className=" btn-large button sign-up-button" type="button">Sign up</button>
            </form>
            <SignUpValidation />
        </div>

        )
    }
}

export default Signup




