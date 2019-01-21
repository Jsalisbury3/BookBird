import types from './types';
import axios from "axios/index";

export const getDataForBookClicked = (ID) => {
   debugger;
    return (dispatch) => {
        axios({
            method: "get",
            url: `/api/BookInfoIndex/${ID}`,
            data : ID
        }).then( (listingInfo) => {
            console.log("BOOKINFO ACTION RESPONSE: ", listingInfo);
            debugger;
            dispatch({
                type: types.BOOK_INFO_INDEX,
                payload: {
                    bookInfo: listingInfo.data.data,
                    images: listingInfo.data.images
                }
            })

        });
    }
}


//         .then( (response) => {
//             this.handleIncomingBookData(response);
//         })
// };