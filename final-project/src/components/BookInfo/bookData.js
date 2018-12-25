import React from 'react';
import './app.css'

function IndividualBookData(props) {
    console.log('props:',props);
    return (
     <div className='Container'>
        <div className='BookInfo'>
            <h1><strong>Title: </strong> {props.title}</h1>
            <h2><strong>Author:</strong> {props.author} </h2>
            <h3><strong>Edition:</strong> {props.edition}</h3>
            <h4><strong>ISBN:</strong> {props.ISBN}</h4>
            <h5><strong>Condition:</strong> {props.condition}</h5>

        </div>
        <div>
            <h1 className="SellersEmail"><strong>Sellers Email:</strong> </h1>
            <h1 className='userEmail'>{props.sellersEmail} </h1>
        </div>
         <div>
             <h1 className='SellerTitle'> Sellers Comments:</h1>
             <h1 className='SellersComments'>{props.sellersComment} </h1>
         </div>
         <div className='BookPrice'>
             <h1> Price:</h1>
             <h1 className='price'>${props.price}</h1>
         </div>

     </div>

    )
}

export default IndividualBookData;