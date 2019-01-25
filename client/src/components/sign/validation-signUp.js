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
            <div className={`col ${props.size || 's12'}`}>
                <div className="input-field">
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
                <div className="row">
                    <Field name={"Name"} size={"s9 m8 offset-m2"} component={this.renderInput} id="Name" label={"Name"}/>
                </div>
                <div className="row">
                    <Field name={"EmailSignUp"} size={"s9 m8 offset-m2"} component={this.renderInput} id="EmailSignUp" label={"Email"}/>
                </div>
                <div className="row">
                    <Field name={"PasswordSignUp"} size={"s9 m8 offset-m2"} component={this.renderInput} id={"PasswordSignUp"} label={"Password"}/>
                </div>
                <div className="row">
                    <Field name={"Number"} size={"s9 m8 offset-m2"} component={this.renderInput} id={"Number"}
                           label={"Phone Number"}/>
                </div>
                <div className=" row">
                    {/* <div className="col s6 center">
                        <button onClick={reset} type={"button"} className="btn grey darken-4">clear</button>
                    </div> */}
                    <div className="signup-button col s6 center">
                        <button className="btn yellow darken-2 grey-text text-darken-3">Sign Up</button>
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
    const passwordRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,70})$/;
    const numberRegex = /[0-9]{10}/;   /* /^[2-9]\d{2}-\d{3}-\d{4}$/;  */
    // const nameRegex = /^[a-z0-9_-]{3,15}$/;


    if (!emailRegex.test(EmailSignUp)) {
        console.log('email test');
        errors.EmailSignUp = 'please enter a valid email';
    }

    if (!passwordRegex.test(PasswordSignUp)) {
        errors.PasswordSignUp = "password must be atleast 8 characters long with one capital letter and number";
    }

    // if (nameRegex.test(Name)) {
    //     errors.Password = "please enter a valid password";
    // }
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
