import React from 'react';
import BookInfoIndex from '../BookInfo/'
import {Link} from 'react-router-dom';


export default props => {
    const {title, edition, author, book_condition, ID, price, book_id, bookImage} = props.about;
    console.log("PROPS ABOUTTTTT: ", props.about);
    return (
        <Link to={`/BookInfoIndex/${ID}`}>
            <div className="listItemContainer">
                <div className='listItem'>
                    <div className='itemImageContainer'>
                        <img className='itemImage' src={bookImage}/>
                    </div>
                    <div className='itemDetails'>
                        <p>Title: {title}</p>
                        <p>Author: {author}</p>
                        <p>Condition: {book_condition}</p>
                    </div>
                    <div className='itemPrice'>
                        <h3>Price:</h3>
                        <h1>${price}</h1>
                    </div>
                </div>
            </div>
            
        </Link>
    )
}