import types from './types';
import axios from 'axios';

export async function getServerData () {
    debugger;
    const searchResults = await axios.get("/api/listings").then(response => {
        dispatch({
            type: types.SEARCH_RESULTS,
            payload: response

        })
})
}
// type: types.SEARCH_RESULTS,
//     payload: searchResults.data.data,