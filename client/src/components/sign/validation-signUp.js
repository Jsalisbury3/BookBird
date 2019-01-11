import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {loginUser} from '../../actions/sign_up';
import {bindActionCreators} from "redux";
import signUpReducer from "../../reducers/sign_up_reducer";


class SignInValidation extends Component {

    renderInput = (props) => {
        return (
            <div className={`col ${props.size || 's12'}`}>
                <div className="input-field">
                    <input {...props.input} id={props.id} type="text" autoComplete={"off"}/>
                    <label htmlFor={props.id}>{props.label}</label>
                </div>
                <p className={"red-text text-darken-2"}>{props.meta.touched && props.meta.error}</p>
            </div>
        )
    };

    storeTokenSignUp = () => {
        debugger;
        if (this.props.signUpResults.success) {
            const Token = this.props.signUpResults.data;
            localStorage.setItem("Token", Token);
            this.props.reset();
            this.props.history.push("/UserProfile");
        } else {
            console.log("didnt make it through: ", this.props.signUpResults)
        }
    }


    handleAddItem =  (values) => {
        this.props.loginUser(values).then()
        this.storeTokenSignUp(this.props.signUpResults);
        console.log("MEMEMEMEMME", this.props.signUpResults);
    };

    render() {
        console.log("add item form props: ", this.props);
        const {handleSubmit, reset} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleAddItem)}>
                <div className="row">
                    <Field name={"EmailSignUp"} size={"s12 m8 offset-m2"} component={this.renderInput} id="EmailSignUp" label={"Email"}/>
                </div>
                <div className="row">
                    <Field name={"PasswordSignUp"} size={"s12 m8 offset-m2"} component={this.renderInput} id={"PasswordSignUp"} label={"Password"}/>
                </div>
                <div className="row">
                    <Field name={"Name"} size={"s12 m8 offset-m2"} component={this.renderInput} id="Name" label={"Name"}/>
                </div>
                <div className="row">
                    <div className="col s6 center">
                        <button onClick={reset} type={"button"} className="btn red darken-2">clear</button>
                    </div>
                    <div className="col s6 center">
                        <button className="btn grey darken-2">Sign Up</button>
                    </div>
                </div>
            </form>
        );
    }

}

function validate(values) {
    const {EmailSignUp, PasswordSignUp, Name} = values;
    const errors = {};
    const emailRegex = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;
    const passwordRegex = /^[a-z0-9_-]{3,15}$/;
    const nameRegex = /^[a-z0-9_-]{3,15}$/;
    if (emailRegex.test(EmailSignUp)) {
        errors.Email = 'please enter a valid email';
    }

    if (passwordRegex.test(PasswordSignUp)) {
        errors.Password = "please enter a valid password";
    }

    if (nameRegex.test(Name)) {
        errors.Password = "please enter a valid password";
    }
    return errors;
}

function mapStateToProps(state) {
    console.log("state: ", state);
    return {
        signUpResults : state.signUpReducer.signUpInfo
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
