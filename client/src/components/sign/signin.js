import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './sign.css'


class Signin extends Component{
    constructor(props){
        super(props);
        this.state={
            Email: "",
            password:""
        }
    }
    validateContactForm=(event)=>{
        event.preventDefault();
        console.log('hi');
        const test= [
            {
                element: "input[name=Email]",
                pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                errorMessage: 'must be a valid email address'
            },
            {
                element: "input[name=password]",
                pattern: /^(?=.*\d).{4,8}$/,
                errorMessage: "Password must be between 4 and 8 digits long and include at least one numeric digit"
            }
        ]
        if(test.length === test.filter( this.validateInputAndDisplayError).length){
            //send message
        }
    }
    validateInputAndDisplayError=(test)=>{
        let element = test.element;
        const elementVal = document.querySelector(element).value;
        let pattern = test.pattern;
        let errorMessage = test.errorMessage;
        console.log("e: ",element);
        console.log("p: ", pattern);
        console.log("err: ",errorMessage);
        const result = pattern.test( elementVal );
        if( !result ){
            document.querySelector(element).nextSibling.innerHTML = errorMessage;
        } else {
            document.querySelector(element).nextSibling.innerHTML = errorMessage;
        }

        return result;
    }


    handleInput = (event) => {
        console.log("change event name", event.target.name);
        console.log("change event value", event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    // componentDidMount(){
    //     this.validateContactForm();
    // }

    render(){
        return(
            <div className="signin_container">
                <p className="signin_footer">Dont have an account? <Link to={"/sign/signup"}>Sign up now! </Link> </p>
                <h1 className="sign_in">Sign in</h1>
                <form className="sign_in_form" onSubmit={this.validateContactForm}>
                    <label htmlFor="Email">Email</label>
                    <input className="input"name = "Email" placeholder="Email"type="text"  onChange={this.handleInputs}/>
                    <div className="error"></div>
                    <label htmlFor="Password">Password</label>
                    <input className="input"name = "password" placeholder="Password"type="text" onChange={this.handleInputs} />
                    <div className="error"></div>
                    <button className="sign_in_button">Sign in</button>
                </form>
            </div>
        )
    }
}

export default Signin