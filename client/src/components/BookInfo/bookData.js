import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataForBookClicked } from '../../actions/book_id';
import './book-data.css';
import CarouselItem from './carousel-item';

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

class IndividualBookData extends Component {

    state = {
        bookId : this.props.match.params.bookId,
        images: this.props.images,
        listId: {
            bookImage: '',
            title: '',
            author: '',
            ISBN: '',
            condition: '',
            price: '',
            sellersComment: '',
        },
        data: ''
    };

    createCarousel = () => {
        const bookImages = document.querySelectorAll('.carousel');
        const initCarousel = M.Carousel.init(bookImages,{
            numVisible: 3,
            padding: 0,
        });
    }

    componentDidMount = () => {
        this.props.getDataForBookClicked(this.state.bookId);
        this.createCarousel();
    }

    render() {
        console.log('BOOK DATA: ', this.props)
        debugger;
        return (
            <div className='Container'>
                <div className="carousel" id="imageContainer">
                        <a className="carousel-item responsive-img" id="book-item" href="#one!">
                            <img src={this.props.listId.bookImage}/>
                        </a>
                        <CarouselItem images={this.props.images}/> 
                        
                </div>
                <div className="s12 m6">
                    <div className="card" id="cardContainer">
                        <div className="card-content book-content">
                            <div className="bookInfoLeftContent s8">
                                <h6 className="bookTitle">{this.props.listId.title}</h6>
                                <h6 className="bookAuthor">{this.props.listId.author}</h6>
                                <h6 className="bookISBN">{this.props.listId.ISBN}</h6>
                            </div>
                            <div className="bookInfoRightContent s4">
                                <div className="bookCondition">
                                    <h6>{this.props.listId.condition}</h6>
                                </div>
                                <div className="bookPrice">
                                    <h5>${this.props.listId.price}</h5>
                                </div>
                            </div>
                            <div className="sellersContent">
                                <h6>Seller's Comments</h6>
                                <h5>{this.props.listId.sellersComment}</h5>
                            </div>
                        </div>
                        <div className="card-action" id="contactAction">
                            <a href="#" id="contactAction">This is a link</a>
                        </div>
                    </div>
                </div>
            </div>
    
        )

    }
    
}

function mapStateToProps(state) {
    debugger;
    console.log('book index state: ', state);
    return {
        listId: state.bookIdReducer.bookInfo[0],
        images: state.bookIdReducer.images

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataForBookClicked: bindActionCreators(getDataForBookClicked,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualBookData);