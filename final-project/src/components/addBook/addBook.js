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

    render() {
        return (
            <div className={"container"}>
                <div className={"header"}>HEADER</div>
                <div className={"fieldsText"}>Complete all required * fields:</div>
                <form onSubmit={this.addBook}>
                    <input placeholder={"Course"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"*ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <input type={"number"} placeholder={"*condition"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"Title"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"Author"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"*Seller's email"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"*Price $$$$"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"Seller's Comments"} className={"inputs last"} onChange={this.handleInput}/>
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