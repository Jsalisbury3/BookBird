import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataForBookClicked } from '../../actions/book_id';
import './book-data.css';
import CarouselItem from './carousel-item';
import Header from './../universal/header';
import Nav from './../universal/nav';

class IndividualBookData extends Component {

    state = {
        bookId : this.props.match.params.bookId,
        images: [],
        listId: [],
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
        console.log('BOOKDATA STATE: ', this.props);
        if(!this.props.listId[0]){
            return <h1>Loading...</h1>
        }
        return (
            <div className='Container'>
                <Header/>
                <div className="carousel" id="imageContainer">
                        <a className="carousel-item responsive-img" id="book-item" href="#one!">
                            <img src={this.props.listId[0].bookImage}/>
                        </a>
                        <CarouselItem images={this.props.images}/> 
                </div>
                <div className="s12 m6">
                    <div className="card" id="cardContainer">
                        <div className="card-content book-content">
                            <div className="bookInfoLeftContent s8">
                                <h6 className="bookTitle">{this.props.listId[0].title}</h6>
                                <h6 className="bookAuthor">{this.props.listId[0].author}</h6>
                                <h6 className="bookISBN">{this.props.listId[0].ISBN}</h6>
                            </div>
                            <div className="bookInfoRightContent s4">
                                <div className="bookCondition">
                                    <h6>{this.props.listId[0].book_condition}</h6>
                                </div>
                                <div className="bookPrice">
                                    <h5>${this.props.listId[0].price}</h5>
                                </div>
                            </div>
                            <div className="sellersContent">
                                <h6>Seller's Comments</h6>
                                <h5>{this.props.listId[0].comments}</h5>
                            </div>
                        </div>
                        <div className="card-action" id="contactAction">
                            <a href="#" id="contactAction">This is a link</a>
                        </div>
                    </div>
                </div>
                <Nav/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log('book index state: ', state);
    return {
        listId: state.bookIdReducer.bookInfo,
        images: state.bookIdReducer.images
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataForBookClicked: bindActionCreators(getDataForBookClicked,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualBookData);