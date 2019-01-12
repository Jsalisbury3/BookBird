import React, {Component} from 'react';
import BookInfoIndex from '../BookInfo'
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class UserPost extends Component{
    constructor(props){
        super(props);
    }
    
    
    render(){
        console.log("about props: ", this.props.about);
        const { title, edition, author, condition, course, price, ID, listingID } = this.props.about;
        return (
            <div className='listItem'>
                <Link to={`/BookInfoIndex/${this.ID}`}>
                    
                        <div className='itemImageContainer'>
                            <img className='itemImage' src="" />
                        </div>
                        <div className='itemDetails'>
                            <p>Title: {title}</p>
                            <p>Edition: {edition}</p>
                            <p>Author: {author}</p>
                            <p>Condition: {condition}</p>
                            
                        </div>
    
                    
                </Link>
                <div className='delete-btn-container'>
                    <p>Price: ${price}</p>
                    <button className='waves-effect btn red center' onClick={this.props.delete}><i className='medium material-icons center'>delete_outline</i></button>
                </div>
            </div>
    
        )
    }
    
}