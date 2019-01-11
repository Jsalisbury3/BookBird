import types from '../actions/types';

const DEFAULT_STATE = {
    signUpInfo: []
};

function signUpReducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case types.SIGN_UP_ACTION:
            return {
                ...state,
                signUpInfo: action.payload,
            };
        default:
            return state;
    }
}

export default signUpReducer;