import types from './types';
import axios from 'axios';


// function requestData() {
//     axios.get("/api/listings").then((res)=>{
        
//         res.data.data
//     });

// }
export const getServerData = () => {
    debugger;
    axios.get("/api/listings")
    // .then(response => response.json())
    .then( searchResults => {
            dispatch({
                type: types.SEARCH_RESULTS,
                payload: response
            })
        
        })
    
        
        
}

