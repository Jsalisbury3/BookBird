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
                <form onSubmit={this.addBook}>
                    <input placeholder={"course"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <input type={"number"} placeholder={"condition"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"title"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"author"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"email"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"price"} className={"inputs"} onChange={this.handleInput}/>
                    <input placeholder={"comments"} className={"inputs last"} onChange={this.handleInput}/>
                    <div className={"text"}>Upload Book Images</div>
                    <img className={"dragDrop"} src="" alt="drag and drop"/>
                    <button className={"POST"}>Post</button>
                    <div className={"nav"}></div>
                    <div className={"ex"}></div>
                </form>
            </div>
        )
    }
}

export default AddBook