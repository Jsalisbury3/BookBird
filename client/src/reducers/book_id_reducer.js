import types from '../actions/types';

const DEFAULT_STATE = {
    listingInfo: '',
};

function bookIdReducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case types.BOOK_INFO_INDEX:
            console.log("book_Id Reducer State: ", state);
            console.log("book_Id Reducer Action: ", action);
            return {
                ...state,
                listingInfo: {...action.payload},
            }
        default:
            return state;
    }

}

export default bookIdReducer;