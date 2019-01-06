import types from '../actions/types';

const DEFAULT_STATE = {
    searchResults: []
}

export default (state = DEFAULT_STATE, action) => {
    console.log("Listing Reducer State: ", state);
    console.log("Listing Reducer Action: ", action);
    switch(action.type) {
        case types.SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload,
            }
        default:
            return state;
    }
}

