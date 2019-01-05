import types from '../actions/types';

const DEFAULT_STATE = {
    book_id_info: []
};

function bookIdReducer(state = DEFAULT_STATE, action) {
    debugger;
    console.log("book_Id Reducer State: ", state);
    console.log("book_Id Reducer Action: ", action);
    switch(action.type) {
        case types.BOOK_INFO_INDEX:
            return {
                ...state,
                book_id_info: action.payload,
            }
        default:
            return state;
    }
}

export default bookIdReducer;