import types from './types';
import axios from 'axios';


// function requestData() {
//     axios.get("/api/listings").then((res)=>{
        
//         res.data.data
//     });

// }
export async function getServerData () {
    debugger;
    
    const searchResults = await axios.get("/api/listings");
    console.log('SEARCH RESULTS: ', searchResults);
    debugger;
    return {
        type: types.SEARCH_RESULTS,
        payload: searchResults.data.data,
    };

    
        
  
    
};


