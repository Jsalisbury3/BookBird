import types from '../actions/types';

const DEFAULT_STATE = {
    postResults: []
};

function postingReducer(state = DEFAULT_STATE, action) {
    debugger;
    console.log("Posting Reducer State: ", state);
    console.log("Posting Reducer Action: ", action);
    switch(action.type) {
        case types.POST_INFO:
            return {
                ...state,
                postResults: action.payload,
            };
        default:
            return state;
    }
}

export default postingReducer;