import types from '../actions/types';

const DEFAULT_STATE = {
    title: '',
    ISBN: '',
    edition: '',
    author: '',
    condition: '',
    sellersComment: '',
    price: '',
    sellersEmail: '',
};

function bookIdReducer(state = DEFAULT_STATE, action) {
    console.log("book_Id Reducer State: ", state);
    console.log("book_Id Reducer Action: ", action);
    switch(action.type) {
        case types.BOOK_INFO_INDEX:
            return {
                ...state,
                ...action.payload[0],
            }
        default:
            return state;
    }
}

export default bookIdReducer;