import types from '../actions/types';

const DEFAULT_STATE = {
    signInId: []
};

function signInReducer(state = DEFAULT_STATE, action) {
    console.log("Search Reducer State: ", state);
    console.log("Search Reducer Action: ", action);
    switch(action.type) {
        case types.SIGN_IN_ACTION:
            return {
                ...state,
                signInId: action.payload,
            };
        default:
            return state;
    }
}

export default signInReducer;