import React from 'react';
import {Link} from 'react-router-dom';

export default props => {
    const {title, edition, author,ISBN, book_condition, ID, price, book_id, bookImage} = props.about;
    return (
        <Link to={`/BookInfoIndex/${ID}`}>
            <div className="listItemContainer">
                <div className='listItem'>
                    <div className='itemImageContainer'>
                        <img className='itemImage' src={bookImage}/>
                    </div>
                    <div className='itemDetails'>
                        <p>{title}</p>
                        <p>{author}</p>
                        <p>{ISBN}</p>
                    </div>
                    <div className='itemPrice'>
                        <div className={`${book_condition} listing_condition`}>{book_condition}</div>
                        {/* <h3>Price:</h3> */}
                        <h1>${price}</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}