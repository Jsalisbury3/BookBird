import React, {Component} from 'react';
import DragDrop from './images/x3KMH.jpg'
import './addBook.css';
import axios from 'axios';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: '',
            ISBN: '',
            condition: 'Excellent',
            title: '',
            author: '',
            edition: '',
            price: '',
            comments: '',
        }
    }


    handleInput = (event) => {
        console.log("change event name", event.target.name);
        console.log("change event value", event.target.value);
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    validateInputsFields = (event) => {
        event.preventDefault();
        debugger;
        const test = [
            {
                element: 'input[name=ISBN]',
                pattern: /[0-9]{13,}/,
                errorMessage: "Invalid Course"
            },
            {
                element: 'input[name=title]',
                pattern: /[a-zA-Z0-9]{4,140}/,
                errorMessage: "Invalid Title"
            },
            {
                element: 'input[name=author]',
                pattern: /[a-zA-Z0-9]{13,140}/,
                errorMessage: "Invalid Author"
            },
            {
                element: 'input[name=edition]',
                pattern: /[0-9]{1,99}/,
                errorMessage: "Whole Numbers Only"
            },
            {
                element: 'input[name=price]',
                pattern: /[0-9]{1,4}/,
                errorMessage: "Whole Numbers Only"
            },
        ];

        if(test.length === test.filter(this.validateInputAndDisplayError).length) {
            console.log("yayayaayayayyaayy");
        }
    };

    validateInputAndDisplayError = (test) => {
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
    };

    addBook = async (event) => {
        event.preventDefault();
        console.log("state:", this.state);
        let request = {...this.state};
        axios({
            method: 'post',
            url: 'http://localhost:7000/addListing',
            data: request,
        });
        document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
    };


    render() {
        return (
            <div className={"container"}>
                {/*<div className={"fieldsText"}><span className={"textSpan"}>Complete all required * fields:</span></div>*/}
                <form onSubmit={this.validateInputsFields}>
                    {/*<input name={"course"} placeholder={"Course"} className={"inputs"} onChange={this.handleInput}/>*/}
                    <input name={"ISBN"} placeholder={"*ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <select name={"condition"} onChange={this.handleInput} className={"condition"}>
                        <option value="Excellent">Excellent</option>
                        <option value="Used">Used</option>
                        <option value="Heavily used">Heavily used</option>
                    </select>
                    <input name={"title"} placeholder={"Title"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <input name={"author"} placeholder={"Author"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <input name={"edition"} placeholder={"*Edition"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <input name={"price"} placeholder={"*Price $$$$"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <input name={"comments"} placeholder={"Seller's Comments"} className={"inputs last"}
                           onChange={this.handleInput}/>
                    {/*<div className={"text"}>Upload Book Images</div>*/}
                    <img className={"dragDrop"} src={DragDrop} alt="drag and drop"/>
                    <button className={"POST"}>Post</button>
                </form>
            </div>
        )
    }
}

export default AddBook