import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getIdForToken} from '../../actions/sign_in';
import {bindActionCreators} from "redux";
import signInReducer from "../../reducers/sign_in_reducer";
import {Link} from 'react-router-dom';

class SignInValidation extends Component {

    componentDidUpdate() {
        if (this.props.signInResults.success) {
            this.storeToken(this.props.signInResults);
        }
    }

    storeToken = () => {
        if (this.props.signInResults.success) {
            const Token = this.props.signInResults.data;
            localStorage.setItem("Token", Token);
            this.props.reset();
            this.props.history.push("/UserProfile");
        }
    }

    renderInput = (props) => {
        return (
            <div className={`col ${props.size || 's9'}`}>
                <div className="input-field">
                    <input className="signInInput" {...props.input} id={props.id} type="text" autoComplete={"off"}/>
                    <label className="signInLabel" htmlFor={props.id}>{props.label}</label>
                </div>
                <p className={"red-text text-darken-2"}>{props.meta.touched && props.meta.error}</p>
            </div>
        )
    };

    handleAddItem =  async (values) => {
        await this.props.getIdForToken(values);
        this.storeToken(this.props.signInResults);
    };

    render() {
        console.log("add item form props: ", this.props);
        const {handleSubmit, reset} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleAddItem)}>
                <div className="row">
                    <Field name={"Email"} size={"s9 m8 offset-m2"} component={this.renderInput} id="Email"
                           label={"Email"}/>
                </div>
                <div className="row">
                    <Field name={"Password"} size={"s9 m8 offset-m2"} component={this.renderInput} id={"Password"}
                           label={"Password"}/>
                </div>
                <div className="row">
                    <div className="col s6 center">
                        <button onClick={reset} type={"button"} className="btn red darken-2">clear</button>
                    </div>
                    <div className="col s6 center">
                        <button className="btn grey darken-2">Sign In</button>
                    </div>
                </div>
                
            </form>
        );
    }

}

function validate(values) {
    const {Email, Password} = values;
    console.log("emaillllllllllllllll: ", Email);
    const errors = {};
    const emailRegex = /[a-z]{4,12}/; //"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
    const passwordRegex = /[a-z]{4,12}/; //(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
    if (!emailRegex.test(Email)) {
        errors.Email = 'please enter a valid email';
    }

    if (!passwordRegex.test(Password)) {
        errors.Password = "please enter a valid password";
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



















