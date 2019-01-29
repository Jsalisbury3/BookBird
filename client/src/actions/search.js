import types from './types';
import axios from "axios/index";


export const searchFilter = (request) => {
    debugger;
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/filter',
            data: request,
        }).then( (filteredResults) => {
            dispatch({
                type: types.SEARCHBAR_FILTER,
                payload: filteredResults.data.data
            })
        })
    }
};