import types from '../actions/types';

const DEFAULT_STATE = {
    bookInfo: [{
        bookImage: '',
        title: '',
        author: '',
        ISBN: '',
        condition: '',
        price: '',
        sellersComment: '',
    }],
    images: []
    
};

function bookIdReducer(state = DEFAULT_STATE, action) {
    
    switch(action.type) {
        case types.BOOK_INFO_INDEX:
            console.log("book_Id Reducer State: ", state);
            console.log("book_Id Reducer Action: ", action);
            
            return {
                ...state,
                bookInfo: {...action.payload.bookInfo},
                images: action.payload.images
            }
        default:
            return state;
    }

}

export default bookIdReducer;