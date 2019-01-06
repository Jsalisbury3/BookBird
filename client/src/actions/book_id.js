import types from './types';
import axios from "axios/index";

export const getDataForBookClicked = (bookId) => {
    console.log('BOOK ID: ', bookId)
    return (dispatch) => {
        axios({
            method: "get",
            url: `/api/BookInfoIndex/${bookId}`,
            // data : this.state.bookId
        }).then( (bookInfo) => {
            console.log("BOOKINFO YO: ", bookInfo);
            dispatch({
                type: types.BOOK_INFO_INDEX,
                payload: bookInfo.data.data,
            })
        });
    }
}


//         .then( (response) => {
//             this.handleIncomingBookData(response);
//         })
// };