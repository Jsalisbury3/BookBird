import React from 'react';
// import ',/51pw4Y1-iJL._SX388_BO1,204,203,200_.jpg'

function IndividualBookData(props) {
    console.log('props:',props);
    return (
     <div className='Container'>
        <div className='BookInfo'>
            <h2><strong>Title: </strong> {props.title}</h2>
            <h2><strong>Author:</strong> {props.author} </h2>
            <h2><strong>Edition:</strong> {props.edition}</h2>
            <h2><strong>ISBN:</strong> {props.ISBN}</h2>
            <h2><strong>Condition:</strong> {props.condition}</h2>

        </div>
         <div className='image'>
             {/* <img src="51pw4Y1-iJL._SX388_BO1,204,203,200_.jpg"/> */}
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