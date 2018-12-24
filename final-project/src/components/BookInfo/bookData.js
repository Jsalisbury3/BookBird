import React from 'react';

function IndividualBookData(props) {
    console.log('props:',props);
    return (
     <div className='Container'>
        <div className='BookInfo'>
             <h1>Title: {props.title}</h1>
             <h2>ISBN: {props.ISBN}</h2>
             <h3>Edition: {props.edition}</h3>
             <h4>Author: {props.author} </h4>
            <h5> Condition: {props.condition}</h5>
        </div>
        <div className="SellersEmail">
            <h1>Sellers Email: {props.sellersEmail} </h1>
        </div>
         <div className='SellersComments'>
             <h1> Sellers Comments: {props.sellersComment} </h1>
         </div>
         <div className='Images'>
             <h1>{props.images}</h1>
         </div>
     </div>

    )
}

export default IndividualBookData;