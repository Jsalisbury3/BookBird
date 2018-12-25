import React from 'react';

export default props => {
    const {title,edition,author,condition,course,price}=props.about;
    return (
        <div className='listItem'>
            <div className='itemImageContainer'>
            <img className='itemImage' src={props.images}/>
            </div>
            <div className='itemDetails'>
                <p>Title: {title}</p>
                <p>Edition: {edition}</p>
                <p>Author: {author}</p>
                <p>Condition: {condition}</p>
                {/* <p>Course: {course}</p> */}
            </div>
            <div className='itemPrice'>
                <h3>Price:</h3>
                <h1>${price}</h1>
            </div>
        </div>
    )
}