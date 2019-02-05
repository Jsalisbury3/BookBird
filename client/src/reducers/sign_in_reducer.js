import types from '../actions/types';

const DEFAULT_STATE = {
    signInId: []
};

function signInReducer(state = DEFAULT_STATE, action) {
    console.log("Search Reducer State: ", state);
    console.log("Search Reducer Action: ", action);
    switch(action.type) {
        case types.SIGN_IN_ACTION:
            if(action.payload.success) {
                return {
                    ...state,
                    signInId: action.payload,
                };
            } else {
                return {
                    ...state,
                    signInId: action.payload,
                    message: "Invalid Username/Password"
                }
            }

        default:
            return state;
    }
}

export default signInReducer;