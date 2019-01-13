import types from '../actions/types';

const DEFAULT_STATE = {
    bookIdInfo: [],
};

function bookIdReducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case types.BOOK_INFO_INDEX:
            console.log("book_Id Reducer State: ", state);
            console.log("book_Id Reducer Action: ", action);
            return {
                ...state,
                bookIdInfo: {...action.payload},
            }
        default:
            return state;
    }

}

export default bookIdReducer;