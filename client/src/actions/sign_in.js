import types from './types';
import axios from 'axios';


export const getIdForToken = (request) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/SignIn',
            data: request,
            headers: {token: localStorage.getItem('Token')}
        }).then((signInResults) => {
            console.log(signInResults.data);
            dispatch({
                type: types.SIGN_IN_ACTION,
                payload: signInResults.data
            })
        })
    }
};


// export const getServerData = () => {
//     return (dispatch) => {
//         axios.get("/api/listings")
//             .then( (searchResults) => {
//                 dispatch({
//                     type: types.SEARCH_RESULTS,
//                     payload: searchResults.data.data
//                 })
//             })
//     }
// };