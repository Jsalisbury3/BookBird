import types from './types';
import axios from "axios/index";

export const getDataForBookClicked = (bookId) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: `/api/BookInfoIndex/${bookId}`,
            // data : this.state.bookId
        }).then( (bookInfo) => {
            dispatch({
                type: types.BOOK_INFO_INDEX,
                payload: bookInfo.data,
            })
        });
    }
}


//         .then( (response) => {
//             this.handleIncomingBookData(response);
//         })
// };