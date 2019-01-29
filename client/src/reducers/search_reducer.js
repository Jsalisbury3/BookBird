import types from '../actions/types';

const DEFAULT_STATE = {
    filterResults: []
};

function searchBarReducer(state = DEFAULT_STATE, action) {
    debugger;
    console.log("Search Reducer State: ", state);
    console.log("Search Reducer Action: ", action);
    switch(action.type) {
        case types.SEARCHBAR_FILTER:
            return {
                ...state,
                filterResults: action.payload,
            };
        default:
            return state;
    }
}

export default searchBarReducer;