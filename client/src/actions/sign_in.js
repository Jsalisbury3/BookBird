import types from './types';
import axios from 'axios';


export const getIdForToken = (request) => {
    debugger;
    return (dispatch) => {
        try {
            axios({
                method: 'post',
                url: '/api/SignIn',
                data: request,
                headers: {token: localStorage.getItem('Token')}
            }).then((signInResults) => {
                console.log("sing in resulttt: ", signInResults.data);
                dispatch({
                    type: types.SIGN_IN_ACTION,
                    payload: signInResults.data
                })
            })
        } catch {
            console.log("NNOOOOOOOOOOOOOOOOOOOOOOOO")
        }

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