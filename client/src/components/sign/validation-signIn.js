import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getIdForToken} from '../../actions/sign_in';
import {bindActionCreators} from "redux";

class SignInValidation extends Component {
    componentDidUpdate() {
        if (this.props.signInResults.success) {
            this.storeToken(this.props.signInResults);
        }
    }

    storeToken = () => {
        if (this.props.signInResults.success && this.props.signInResults.runOnce) {
            const Token = this.props.signInResults.data;
            localStorage.setItem("Token", Token);
            this.props.signInResults.runOnce = false;
            this.props.reset();
            this.props.history.push("/UserProfile");
        }
    }

    renderInput = (props) => {
        return (
            <div className={`col ${props.size || 's9'}`}>
                <div className="input-field">
                    <input className="signInInput grey-text text-lighten-5" {...props.input} id={props.id} type={props.id === "Password" ? 'password' : 'text'} autoComplete={"off"}/>
                    <label className="signInLabel yellow-text text-darken-2" htmlFor={props.id}>{props.label}</label>
                </div>
                
            </div>
        )
    };

    handleAddItem =  async (values) => {
        await this.props.getIdForToken(values);
        localStorage.removeItem("Token");
        console.log('signin storage:', this.props.signInResults);
        this.storeToken(this.props.signInResults);
        
    };

    render() {
        const {handleSubmit, reset} = this.props;
        return (
            <form id='sign-in-container' onSubmit={handleSubmit(this.handleAddItem)}>
                <div className="row">
                    <Field name={"Email"} size={"s9 m8 offset-m2"} component={this.renderInput} id="Email"
                           label={"Email"}/>
                </div>
                <div className="row">
                    <Field name={"Password"} size={"s9 m8 offset-m2"} component={this.renderInput} id={"Password"}
                           label={"Password"}/>
                </div>
                <div className="row">
                    <div className="signin-button col s6 center">
                        <button className="btn yellow darken-2 grey-text text-darken-3">Sign In</button>
                    </div>
                </div>
                {/* <p className={"sign-in-error red-text text-darken-2"}>{props.meta.error}</p> */}
                
            </form>
        );
    }

}

function validate(values) {
    const {Email, Password} = values;
    console.log("emaillllllllllllllll: ", Email);
    const errors = {};
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;

    if (!emailRegex.test(Email)) {
        errors.Email = 'please enter a valid email';
    }

    if (!passwordRegex.test(Password)) {
        errors.Password = "password must be at least 8 characters long with one capital letter and number";
    }
    return errors;
}

function mapStateToProps(state) {
    console.log("state: ", state);
    return {
        signInResults : state.signInReducer.signInId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getIdForToken: bindActionCreators(getIdForToken, dispatch),
    }
}

SignInValidation = connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInValidation));


export default reduxForm({
    form: 'signInForm',
    validate: validate,
    enableReinitialize: true,
})(SignInValidation)



















