import types from './types';
import axios from 'axios';

export const getServerData = () => {
    return (dispatch) => {
        axios.get("/api/listings")
        .then( (searchResults) => {
            dispatch({
                type: types.SEARCH_RESULTS,
                payload: searchResults.data.data
            })
        })
    }
}

