import types from './types';
import axios from "axios/index";
export async function searchFilter() {
    const filterResults = axios({
        method: 'post',
        url: '/api/filter',
        data: request,
    });
    return {
        type: types.SEARCH_FILTER,
        payload: filterResults.data.data
    }
}

//     .then( (response) => {
//     this.props.function(response);
// })