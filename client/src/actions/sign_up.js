import types from './types';
import axios from 'axios';

export const loginUser = (request) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/SignUp',
            data: request,
            headers: {token: localStorage.getItem('Token')}
        }).then((signUpResults) => {
            dispatch({
                type: types.SIGN_UP_ACTION,
                payload: signUpResults.data
            })
        })
    }
};







