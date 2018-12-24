import React from 'react';

export default props => {
    const {title,edition,author,condition,course,price}=props.about;
    return (
        <div>
            <img src={props.images}/>
            <div>
                <p>Title: {title}</p>
                <p>Edition: {edition}</p>
                <p>Author: {author}</p>
                <p>Condition: {condition}</p>
                {/* <p>Course: {course}</p> */}
            </div>
            <div>
                <h3>Price:</h3>
                <h1>${price}</h1>
            </div>
        </div>
    )
}