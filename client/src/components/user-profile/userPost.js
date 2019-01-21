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
        const { title, edition, author, book_condition, course, price, ID, listingID, bookImage, profile_photo_url } = this.props.about;
        return (
                    <div className='listItem'>
                        <Link to={`/BookInfoIndex/${this.ID}`}>
                            
                                <div className='itemImageContainer'>
                                    <img className='itemImage' src={bookImage}/>
                                </div>
                                <div className='itemDetails'>
                                    <p>Title: {title}</p>
                                    <p>Author: {author}</p>
                                    <p>Condition: {book_condition}</p>  
                                </div>                            
                        </Link>
                        <div className='delete-btn-container'>
                            <p>Price: ${price}</p>
                            <button className='waves-effect btn red center' onClick={this.props.delete}><i className='large material-icons center'>delete_outline</i></button>
                        </div>
                    </div>
                )
    }
    
}