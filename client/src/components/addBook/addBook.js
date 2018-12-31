import React, {Component} from 'react';
import DragDrop from './images/x3KMH.jpg'
import './addBook.css';
import axios from 'axios';
import 'materialize-css';
import 'material-icons';

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
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    validateInputsFields = (event) => {
        event.preventDefault();
        const test = [
            {
                element: 'input[name=ISBN]',
                pattern: /[0-9]{13,}/,
                errorMessage: "Invalid ISBN number",
                index: 0
            },
            {
                element: 'input[name=condition]',
                pattern: /^(New|Like New|Good|Worn|Thrashed)$/,
                errorMessage: "Invalid Condition Selection",
                index: 1
            },
            {
                element: 'input[name=title]',
                pattern: /[a-zA-Z0-9]{4,140}/,
                errorMessage: "Invalid Title",
                index: 2
            },
            {
                element: 'input[name=author]',
                pattern: /[a-zA-Z0-9]{4,140}/,
                errorMessage: "Invalid Author",
                index: 3
            },
            {
                element: 'input[name=edition]',
                pattern: /[0-9]{1,99}/,
                errorMessage: "Whole Numbers Only",
                index: 4
            },
            {
                element: 'input[name=price]',
                pattern: /[0-9]{1,4}/,
                errorMessage: "Whole Numbers Only",
                index: 5
            },
        ];

        if(test.length === test.filter(this.validateInputAndDisplayError).length) {
            console.log("yayayaayayayyaayy");
        }
    };

    validateInputAndDisplayError = (test) => {
        let element = test.element;
        if(element === "input[name=condition]") {
            var selected = document.getElementById("mySelect").selectedIndex;
            var options = document.getElementById("mySelect").options;
            var elementVal = options[selected].value;
        } else {
            var elementVal = document.querySelector(element).value;
        }
        console.log(elementVal);
        let pattern = test.pattern;
        let errorMessage = test.errorMessage;
        let index = test.index;
        const result = pattern.test( elementVal );
        if( !result ){
            if(element !== "input[name=condition]") {
                document.getElementsByClassName("error")[index].nextElementSibling.classList.remove("visible");
                document.querySelector(element).nextSibling.innerHTML = errorMessage;
            } else {
                document.getElementById("conditionError").innerHTML = errorMessage;
                document.getElementById("conditionCheckMArk").classList.remove("visible");
            }

        } else {
            if(element !== "input[name=condition]") {
                document.getElementsByClassName("error")[index].nextElementSibling.classList.add("visible");
                document.querySelector(element).nextSibling.innerHTML = '';
            } else {
                document.getElementById("conditionError").innerHTML = '';
                document.getElementById("conditionCheckMArk").classList.add("visible");
            }

        }

        document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
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

        // document.getElementsByClassName('modalPageContainer')[0].style.display = "block";
    };

    render() {
        return (
            <div className={"container"}>
                {/*<div className={"fieldsText"}><span className={"textSpan"}>Complete all required * fields:</span></div>*/}
                <form onSubmit={this.validateInputsFields}>
                    {/*<input name={"course"} placeholder={"Course"} className={"inputs"} onChange={this.handleInput}/>*/}
                    <input name={"ISBN"} placeholder={"*ISBN"} className={"inputs ISBN"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markISBN material-icons"}>check_circle_outline</div>
                    <select name={"condition"} onChange={this.handleInput} id={"mySelect"} className={"condition"}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Worn">Worn</option>
                        <option value="Thrashed">Thrashed</option>
                    </select>
                    <div id={"conditionError"} className={"error"}></div>
                    <div id={"conditionCheckMArk"} className={"checkMark markCondition material-icons"}>check_circle_outline</div>
                    <input name={"title"} placeholder={"Title"} className={"inputs TITLE"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markTitle material-icons"}>check_circle_outline</div>
                    <input name={"author"} placeholder={"Author"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markAuthor material-icons"}>check_circle_outline</div>
                    <input name={"edition"} placeholder={"*Edition"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markEdition material-icons"}>check_circle_outline</div>
                    <input name={"price"} placeholder={"*Price $$$$"} className={"inputs"} onChange={this.handleInput}/>
                    <div className={"error"}></div>
                    <div className={"checkMark markPrice material-icons"}>check_circle_outline</div>
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