import React, {Component} from 'react';
import './book-data.css';

// function IndividualBookData(props) {
//     console.log("PROOOOOOOOOOOOOPS: ", props);
//     return (
//         <div className='Container'>
//             <div className='BookInfo'>
//                 <h2 className='TitleTag'><strong>Title:</strong> {props.title}</h2>
//                 <h2><strong>Author:</strong> {props.author} </h2>
//                 <h2><strong>ISBN:</strong> {props.ISBN}</h2>
//                 <h2><strong>Condition:</strong> {props.condition}</h2>

//             </div>
//             <div>
//                 <h1 className='SellerTitle'><strong>Sellers Comments:</strong></h1>
//                 <h1 className='SellersComments'>{props.sellersComment} </h1>
//             </div>
//             <div className='BookPrice'>
//                 <h1 className='priceTitle'> Price:</h1>
//                 <h1 className='price'>${props.price}</h1>
//             </div>
//             <button className={"btn blue center waves-effect"}>Contact Seller</button>
//         </div>

//     )
// }

// export default IndividualBookData;

function IndividualBookData(props) {
    console.log("PROOOOOOOOOOOOOPS: ", props);
    return (
        <div className='Container'>
            <div className="carousel" id="imageContainer">
                    <a className="carousel-item" id="book-item" href="#one!">
                        <img src={props.bookImage}/>
                    </a>    
            </div>
            <div className="s12 m6">
                <div className="card" id="cardContainer">
                    <div className="card-content book-content">
                        <div className="bookInfoLeftContent s8">
                            <h6 className="bookTitle">{props.title}</h6>
                            <h6 className="bookAuthor">{props.author}</h6>
                            <h6 className="bookISBN">{props.ISBN}</h6>
                        </div>
                        <div className="bookInfoRightContent s4">
                            <div className="bookCondition">
                                <h6>{props.condition}</h6>
                            </div>
                            <div className="bookPrice">
                                <h5>${props.price}</h5>
                            </div>
                        </div>
                        <div className="sellersContent">
                            <h6>Seller's Comments</h6>
                            <h5>{props.sellersComment}</h5>
                        </div>
                    </div>
                    <div className="card-action">
                        <a href="#" id="contactAction">This is a link</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default IndividualBookData;