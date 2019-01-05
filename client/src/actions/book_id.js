import types from './types';
import axios from "axios/index";

export async function getDataForBookCLicked(){
    const BookInfoIndex = await axios({
        method: "get",
        url: `/api/BookInfoIndex/${this.state.bookId}`,
        // data : this.state.bookId
    });
    return {
        type: types.BOOK_INFO_INDEX,
        payload: BookInfoIndex.data.data,
    }
};


//         .then( (response) => {
//             this.handleIncomingBookData(response);
//         })
// };