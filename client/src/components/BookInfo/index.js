import React, {Component} from 'react';
import BookData from './bookData'
import axios from 'axios'


class Index extends Component{
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

    handleIncomingBookData = async (response) => {
        console.log("response: ", response);
        await this.setState({
            data : response.data.data[0]
        })
    };

    componentDidMount = () => {
        this.getDataForBookCLicked();
    };

    render() {
        console.log("yoyoyoyoyooyo", this.state.data);
        return (
            <div className='main-container'>
                <BookData title={this.state.data.title}
                          ISBN={this.state.data.ISBN}
                          edition ={this.state.data.edition}
                          author={this.state.data.author}
                          condition={this.state.data.book_condition}
                          sellersComment={this.state.data.comments}
                          price={this.state.data.price}
                          sellersEmail={this.state.data.email}
                />
            </div>
        )
        }
    }

export default Index;

