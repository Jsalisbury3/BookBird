import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginUser} from '../../actions/sign_up';
import {bindActionCreators} from "redux";
import signUpReducer from "../../reducers/sign_up_reducer";


class SignInValidation extends Component {

    componentDidUpdate() {
        if (this.props.signInResults.success) {
            this.storeTokenSignUp(this.props.signInResults);
        }
    }

    renderInput = (props) => {
        return (
            // <div className={`col ${props.size || 's12'}`}>

            <div>
                <div className="input-field sign-up-input-field">
                    <input className="signUpInput grey-text text-lighten-5"{...props.input} id={props.id} autoComplete={"off"} type={props.id === "PasswordSignUp" ? 'password' : 'text'}/>
                    <label className="signUpLabel yellow-text text-darken-2" htmlFor={props.id}>{props.label}</label>
                    <p className={"error-message red-text text-darken-2"}>{props.meta.touched && props.meta.error}</p>
                </div>
            </div>
        )
    };

    storeTokenSignUp = () => {
        if (this.props.signInResults.success) {
            const Token = this.props.signInResults.data;
            localStorage.setItem("Token", Token);
            this.props.signInResults.data ='';
            this.props.reset();
            this.props.history.push("/UserProfile");
        } else {
            console.log("didnt make it through: ", this.props.signInResults)
        }
    }


    handleAddItem =  async (values) => {
        await this.props.loginUser(values);
    };

    render() {
        console.log("add item form props: ", this.props);
        const {handleSubmit, reset} = this.props;
        return (
            <form id='sign-up-form' onSubmit={handleSubmit(this.handleAddItem)}>
                <div className="col offset-l1 l7 m8 s9 center-align signUpRow">
                    <Field name={"Name"}  component={this.renderInput} id="Name" label={"Name"}/>
                </div>
                <div className="col offset-l1 l7 m8 s9 center-align signUpRow">
                    <Field name={"EmailSignUp"}  component={this.renderInput} id="EmailSignUp" label={"Email"}/>
                </div>
                <div className="col offset-l1 l7 m8 s9 center-align signUpRow">
                    <Field name={"PasswordSignUp"}  component={this.renderInput} id={"PasswordSignUp"} label={"Password"}/>
                </div>
                <div className="col offset-l1 l7 m8 s9 center-align signUpRow">
                    <Field name={"Number"}  component={this.renderInput} id={"Number"}
                           label={"Phone Number"}/>
                </div>
                <div className="col l12 m12 s12 center-align signInRow">
                    {/* <div className="col s6 center">
                        <button onClick={reset} type={"button"} className="btn grey darken-4">clear</button>
                    </div> */}
                    <div className="signup-button">
                        <button onClick={()=>console.log('################test')} className="btn yellow darken-2 grey-text text-darken-3">Sign Up</button>
                    </div>
                </div>
            </form>
        );
    }

}

function validate(values) {
    const {EmailSignUp, PasswordSignUp, Name, Number} = values;
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!$%@#£€*?&]{8,}$/;
    const numberRegex = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;   /* /^[2-9]\d{2}-\d{3}-\d{4}$/;  */
    const nameRegex = /[a-z]{1,20}/i;

    if (!Name || !nameRegex.test(Name)) {
        console.log('name test', Name);
        errors.Name = "please enter a valid name";
    }
    if (!emailRegex.test(EmailSignUp)) {
        console.log('email test');
        errors.EmailSignUp = 'please enter a valid email';
    }

    if (!passwordRegex.test(PasswordSignUp)) {
        errors.PasswordSignUp = "password must be atleast 8 characters long with one capital letter and number";
    }

    if (!numberRegex.test(Number)) {
        errors.Number = "please enter a valid number ";
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
        loginUser: bindActionCreators(loginUser, dispatch),
    }
}

SignInValidation = connect(mapStateToProps, mapDispatchToProps)(withRouter(SignInValidation));


export default reduxForm({
    form: 'signUpForm',
    validate: validate,
    enableReinitialize: true,
})(SignInValidation)
