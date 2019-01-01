import React from 'react';
import BookInfoIndex from '../BookInfo'
import {Link} from 'react-router-dom';


export default props => {
    const {title, edition, author, condition, course, price,id} = props.about;
    return (
        <Link to={`/BookInfoIndex/${id}`}>
            <div className='listItem'>
                <div className='itemImageContainer'>
                    <img className='itemImage' src={props.images}/>
                </div>
                <div className='itemDetails'>
                    <p>Title: {title}</p>
                    <p>Edition: {edition}</p>
                    <p>Author: {author}</p>
                    <p>Condition: {condition}</p>
                    <p>Price: ${price}</p>
                </div>
                <div className='delete-btn-container'>
                    <button className='delete-button waves-effect btn danger'>Delete <i className='material-icons right'>delete_outline</i></button>
                </div>
            </div>
        </Link>
    )
}