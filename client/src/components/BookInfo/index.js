import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataForBookClicked } from '../../actions/book_id';
import BookData from './bookData'
import axios from 'axios'
import Header from './../universal/header'
import Nav from './../universal/nav'


class Index extends Component {
    state = {
        listId : this.props.match.params.bookId,
        data: ''
    };

    // getDataForBookCLicked = async () => {
    //     console.log("Porps: ", this.props);
    //     console.log("ID: ", this.state.bookId);
    //     await axios({
    //         method: "get",
    //         url: `/api/BookInfoIndex/${this.state.bookId}`,
    //         // data : this.state.bookId
    //     }).then( (response) => {
    //         this.handleIncomingBookData(response);
    //     })
    // };

    // handleIncomingBookData = async (response) => {
    //     console.log("response: ", response);
    //     await this.setState({
    //         data : response.data.data[0]
    //     })
    // };

    createCarousel = () => {
        const bookImages = document.querySelectorAll('.carousel');
        const initCarousel = M.Carousel.init(bookImages);
    }

    componentDidMount = () => {
        this.props.getDataForBookClicked(this.state.listId);
        this.createCarousel();
        // this.setState({
        //     ...this.state,
        //     data: bookInfo
        // })
    };

    render() {
        // console.log("yoyoyoyoyooyo", this.state.data);
        console.log('BOOK DATA STATE,', this.state);
        console.log("Book INFO index: ", this.props.listId);
        const listingInfo = {...this.props.listId};
        console.log('LISTING INFO!:', listingInfo);
        return (
            <Fragment>
                <Header/>

                    <div className='main-container'>
                        <BookData title={listingInfo.title}
                                ISBN={listingInfo.ISBN}
                                edition ={listingInfo.edition}
                                author={listingInfo.author}
                                condition={listingInfo.book_condition}
                                sellersComment={listingInfo.comments}
                                price={listingInfo.price}
                                sellersEmail={listingInfo.email}
                        />
                    </div>
                <Nav/>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    console.log('book index state: ', state);
    return {
        listId: state.bookIdReducer.listingInfo[0],

    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataForBookClicked: bindActionCreators(getDataForBookClicked,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

