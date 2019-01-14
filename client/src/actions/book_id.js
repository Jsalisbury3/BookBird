import types from './types';
import axios from "axios/index";

export const getDataForBookClicked = (bookId) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: `/api/BookInfoIndex/${bookId}`,
            data : bookId
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