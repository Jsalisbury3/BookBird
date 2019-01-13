import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDataForBookClicked } from '../../actions/book_id';
import BookData from './bookData'
import axios from 'axios'


class Index extends Component {
    state = {
        bookId : this.props.match.params.bookId,
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

    componentDidMount = () => {
        this.props.getDataForBookClicked(this.state.bookId);

        // this.setState({
        //     ...this.state,
        //     data: bookInfo
        // })
    };

    render() {
        // console.log("yoyoyoyoyooyo", this.state.data);
        console.log("Book INFO index: ", this.props.bookInfo[0]);
        const bookInfo = {...this.props.bookInfo[0]};
        return (
            <div className='main-container'>
                <BookData title={bookInfo.title}
                          ISBN={bookInfo.ISBN}
                          edition ={bookInfo.edition}
                          author={bookInfo.author}
                          condition={bookInfo.book_condition}
                          sellersComment={bookInfo.comments}
                          price={bookInfo.price}
                          sellersEmail={bookInfo.email}
                />
            </div>
        )
        }
}

function mapStateToProps(state) {
    console.log('book index state: ', state);
    return {
        bookInfo: state.bookIdReducer.bookIdInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getDataForBookClicked: bindActionCreators(getDataForBookClicked,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);

