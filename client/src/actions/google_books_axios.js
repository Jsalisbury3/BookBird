import React, {Component} from 'react';
import axios from 'axios';
import {BASE_URL_GOOGLE_BOOKS, API_KEY} from '../../../config/api'


class GoogleBooks extends Component{
    constructor(props){
        super(props);
        this.state={
            books:[],
            text: 'Harry Potter'
        };
    }

    componentDidMount(){
        this.getBooks();
    }

    getBooks(){
        axios.request({
            method: 'get',
            url: BASE_URL_GOOGLE_BOOKS + this.state.text + API_KEY
        }).then((response)=>{
            this.setState({books: response.data.items},()=>{
                console.log(this.state)
            })
        }).catch((error)=>{
            console.log('Error occured', error);
        })
    }

    handleChange(text){
        this.setState({text:text}, this.getBooks());
    }

    render(){
        return(
            <div>
                <h1 onChange={this.handleChange}>sup</h1>
            </div>
        )
    }
}


export default GoogleBooks