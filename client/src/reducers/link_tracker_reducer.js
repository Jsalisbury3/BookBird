import types from "../actions/types";

const DEFAULT_STATE = {
    message: "unable to store link"
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case types.LINK_TRACKER:
            return {...state, currentLink: action.currentLink};
        case types.LINK_TRACKER_ERROR:
            return {...state, message: action.message};
        default:
            return state
    }
}