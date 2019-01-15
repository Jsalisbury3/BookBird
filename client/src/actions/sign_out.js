import axios from "axios/index";
import types from './types';

export const removeTokenAndRow = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/api/SignOut',
            headers: {token: localStorage.getItem('Token')},
        }).then((signOutResults) => {
            dispatch({
                type: types.SIGN_IN_ACTION,
                payload: signOutResults.data
            })
        })
    }
};