import types from '../actions/types';

const DEFAULT_STATE = {
    searchResults: []
}

function listingReducer(state = DEFAULT_STATE, action) {
    debugger;
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

export default listingReducer;