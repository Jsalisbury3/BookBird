import React, {Component} from 'react';
import './book-data.css';

function IndividualBookData(props) {
    return (
        <div className='Container'>
            <div className='BookInfo'>
                <h2 className='TitleTag'><strong>Title:</strong> {props.title}</h2>
                <h2><strong>Author:</strong> {props.author} </h2>
                <h2><strong>ISBN:</strong> {props.ISBN}</h2>
                <h2><strong>Condition:</strong> {props.condition}</h2>

            </div>
            <div>
                <h1 className="SellersEmail"><strong>Sellers Email:</strong></h1>
                <h1 className='userEmail'>{props.sellersEmail} </h1>
            </div>
            <div>
                <h1 className='SellerTitle'><strong>Sellers Comments:</strong></h1>
                <h1 className='SellersComments'>{props.sellersComment} </h1>
            </div>
            <div className='BookPrice'>
                <h1 className='priceTitle'> Price:</h1>
                <h1 className='price'>${props.price}</h1>
            </div>

        </div>

    )
}

export default IndividualBookData;