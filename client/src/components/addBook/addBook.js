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
                <div className={"fieldsText"}><span className={"textSpan"}>Complete all required * fields:</span></div>
                <form onSubmit={this.addBook}>
                    <input name={"course"} placeholder={"Course"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"ISBN"} placeholder={"*ISBN"} className={"inputs"} onChange={this.handleInput}/>
                    <select name={"condition"} onChange={this.handleInput} className={"condition"}>
                        <option value="Excellent">Excellent</option>
                        <option value="Used">Used</option>
                        <option value="Heavily used">Heavily used</option>
                    </select>
                    <input name={"title"} placeholder={"Title"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"author"} placeholder={"Author"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"edition"} placeholder={"*Edition"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"price"} placeholder={"*Price $$$$"} className={"inputs"} onChange={this.handleInput}/>
                    <input name={"comments"} placeholder={"Seller's Comments"} className={"inputs last"} onChange={this.handleInput}/>
                    <div className={"text"}>Upload Book Images</div>
                    <img className={"dragDrop"} src={DragDrop} alt="drag and drop"/>
                    <button className={"POST"}>Post</button>
                </form>
            </div>
        )
    }
}

export default AddBook