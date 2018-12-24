import React, {Component} from 'react';
import './addBook.css'

class AddBook extends Component {
    constructor(props) {
        super(props);
        const state = {
            course: '',
            ISBN: '',
            condition: '',
            title: '',
            author: '',
            email: '',
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

    addBook = (event) => {
        event.preventDefault();
        const infoObj = this.state;
        return infoObj;
    };

    render() {
        return (
            <div className={"container"}>
                <div className={"header"}>HEADER</div>
                <div className={"fieldsText"}>Complete all required * fields:</div>
                <form onSubmit={this.addBook}>
                    <input name={"Course"} placeholder={"Course"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"ISBN"} placeholder={"*ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <select name={"Condition"} onChange={this.handleInput} className={"condition"}>
                        <option value="Excellent">Excellent</option>
                        <option value="Used">Used</option>
                        <option value="Heavily used">Heavily used</option>
                    </select>
                    <input name={"Title"} placeholder={"Title"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"Author"} placeholder={"Author"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"Email"} placeholder={"*Seller's email"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"Price"} placeholder={"*Price $$$$"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"Comments"} placeholder={"Seller's Comments"} className={"inputs last"} onChange={this.handleInput}/>
                    <div className={"text"}>Upload Book Images</div>
                    <img className={"dragDrop"} src="" alt="drag and drop"/>
                    <button className={"POST"}>Post</button>
                    <div className={"nav"}>nav</div>
                </form>
            </div>
        )
    }
}

export default AddBook