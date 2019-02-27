import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getIdForToken} from '../../actions/sign_in';
import {bindActionCreators} from "redux";

class SignInValidation extends Component {
    state = {
        attempted: false
    }

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
        this.setState({
            attempted: true
        })
        await this.props.getIdForToken(values);
        localStorage.removeItem("Token");
        console.log('signin storage:', this.props.signInResults);
        this.storeToken(this.props.signInResults);
        
    };

    render() {
        const {handleSubmit, reset} = this.props;
        console.log("this.props.signInResults!! ", this.props.signInResults);
        return (
            <form id='sign-in-container' onSubmit={handleSubmit(this.handleAddItem)}>
                <div className="col s10 offset-s1 m10 offset-m1 l9 offset-l1 signInRow">
                    <Field name={"Email"} component={this.renderInput} id="Email"
                           label={"Email"}/>
                </div>
                <div className="col s10 offset-s1 m10 offset-m1 l9 offset-l1 signInRow">
                    <Field name={"Password"} component={this.renderInput} id={"Password"}
                           label={"Password"}/>
                </div>
                <p className={"red-text col s12 m12 l12 center-align sign-in-validation"}>{this.props.signInResults.message && this.state.attempted ? this.props.signInResults.message : ""}</p>
                <div className="col s12 offset-s3 m12 offset-m3 l10 offset-l3 center-align signInRow">
                    <div className="signin-button col s6 ">
                        <button className="btn yellow darken-2 grey-text text-darken-3">Sign In</button>
                    </div>
                </div>
            </form>
        );
    }
}

function validate(values) {
    const {Email, Password} = values;
    const errors = {};
    // const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;

    if (!Email) {
        errors.Email = 'please enter a valid email';
    }

    if (!Password) {
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



















