import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataForBookClicked } from '../../actions/book_id';
import './book-data.css';
import CarouselItem from './carousel-item';
import Header from './../universal/header';
import Nav from './../universal/nav';
import axios from 'axios';
// import loading from './images/loading_gif.gif';
import rainbow from './images/loading_rainbow.gif';
import bookshelf from './images/book_shelf.jpg';
import {Link} from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css';


class IndividualBookData extends Component {

    state = {
        bookId : this.props.match.params.bookId,
        images: [],
        listId: [],
        data: '',
        displayError : false,
    };

    createCarousel = () => {
        const bookImages = document.querySelectorAll('.carousel');
        const initCarousel = M.Carousel.init(bookImages,{
            numVisible: 3,
            padding: 0,
            indicators: true,
        })
    }

    // addConditionStyling = (condition) => {
    //     debugger;
    //     switch (condition) {
    //         case 'Thrashed':
    //             console.log(document.getElementsByClassName('bookCondition'));
    //         default:
    //             console.log('Switch Condition');
    //     }
    // }

    componentDidMount = () => {
        this.props.getDataForBookClicked(this.state.bookId);
        // this.createCarousel();
        // this.addConditionStyling(this.props.listId[0].book_condition);
    }

    componentDidUpdate = () => {
        this.createCarousel();
    }
    contactSeller = () => {
        console.log("button pressed");
        axios({
            method : "post",
            url: '/api/contactSeller',
            headers: {
                token: localStorage.getItem('Token'),
            },
            data: {
                sellersNumber : this.props.listId[0].phoneNumber,
                title : this.props.listId[0].title
            }
        }).then((response) => {
            console.log("response from twilio query: ", response);
            if(response.data.success) {
                this.setState({
                    displayError : true
                })
            } else {
                this.setState({
                    displayError : false
                })
            }
        })
    }

    render() {
        console.log('BOOKDATA STATE: ', this.props);
        if(!this.props.listId[0]){
            return <h1>Loading...</h1>
        }
        return (

              <div className='bookDetailsContainer'>

                  <div id='back-arrow-container'>
                      <Link to={"/"}>
                          <i id='arrow-icon' className='small yellow-text text-darken-1 material-icons'>arrow_back</i>
                      </Link>
                  </div>
                {/* <img id='bookLoadScreen' src={loading}/> */}
                <div className="carousel" id="imageContainer">
            
                <img id="imageBackground" style={{display:'block'}}/>
                
                <img className="bookLoading" style={{display:'none'}}/>
                        <a className="carousel-item responsive-img" id="book-item" href="#one!">
                            <img src={this.props.listId[0].bookImage}/>
                        </a>
                        <CarouselItem images={this.props.images}/> 
                </div>
                {/* <div className="s12 m6"> */}
                    {/* <div className="card" id="cardContainer"> */}
                        
                        <div className="book-content" id="book-content">
                            <div className="bookInfoLeftContent s8">
                                <h6 className="bookTitle">{this.props.listId[0].title}</h6>
                                <h6 className="bookAuthor">{this.props.listId[0].author}</h6>
                                <h6 className="bookISBN">ISBN {this.props.listId[0].ISBN}</h6>
                            </div>
                            <div className="bookInfoRightContent s4">
                                <div className="bookCondition">
                                    <h6 className={(this.props.listId[0].book_condition === 'Like New') ? 'Like_New book_details' : `${this.props.listId[0].book_condition} book_details`}> {(this.props.listId[0].book_condition)}</h6>
                                </div>
                                <div className="bookPrice">
                                    <h5>${this.props.listId[0].price}</h5>
                                </div>
                            </div>
                            <div className="sellersContent">
                                <h6>Seller's Comments</h6>
                                <h5>{this.props.listId[0].comments}</h5>
                                <div className="contactSignIn">{this.state.displayError ? '' : 'Please sign in to contact the seller'}</div>
                            </div>
                            
                        </div>
                            <div className="bookDetailButtonContainer" id="contactAction">
                                <div id="backButtonContainer">
                                    <Link to={"/Landing"} className="btn" id="contactActionBack">BACK</Link>
                                </div>
                                <div id="contactSellerContainer">
                                    <button onClick={this.contactSeller} className="btn" id="contactActionButton">CONTACT SELLER</button>
                                </div>
                            </div>
                        
                    {/* </div> */}
                {/* </div> */}
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