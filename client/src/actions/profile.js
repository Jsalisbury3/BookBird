import types from './types';
import axios from 'axios';

export const getUserListings = () => {
    return (dispatch) => {
        axios.get("/api/UserProfile")
            .then( (profileLisitngs) => {
                dispatch({
                    type: types.USER_LISTINGS,
                    payload: profileLisitngs.data.data,
                })
            })
    }
};