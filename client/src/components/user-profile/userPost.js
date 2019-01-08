import React, {Component} from 'react';
import BookInfoIndex from '../BookInfo'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class UserPost extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        const { title, edition, author, condition, course, price, ID } = this.props.about;
    }
    
    
    render(){
        return (
            <div>
                <Link to={`/BookInfoIndex/${this.ID}`}>
                    <div className='listItem'>
                        <div className='itemImageContainer'>
                            <img className='itemImage' src="" />
                        </div>
                        <div className='itemDetails'>
                            <p>Title: {this.title}</p>
                            <p>Edition: {this.edition}</p>
                            <p>Author: {this.author}</p>
                            <p>Condition: {this.condition}</p>
                            <p>Price: ${this.price}</p>
                        </div>
    
                    </div>
                </Link>
                <div className='delete-btn-container'>
                    <button className='delete-button waves-effect btn-small danger' onClick={this.props.delete}>Delete <i className='material-icons right'>delete_outline</i></button>
                </div>
            </div>
    
        )
    }
    
}