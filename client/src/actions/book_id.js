import types from './types';
import axios from "axios/index";

export const getDataForBookClicked = (ID) => {
   
    return (dispatch) => {
        axios({
            method: "get",
            url: `/api/BookInfoIndex/${ID}`,
            data : ID
        }).then( (listingInfo) => {
            console.log("BOOKINFO YO: ", listingInfo);
            dispatch({
                type: types.BOOK_INFO_INDEX,
                payload: listingInfo.data.data,
            })

        });
    }
}


//         .then( (response) => {
//             this.handleIncomingBookData(response);
//         })
// };