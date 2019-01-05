import types from './types';
import axios from 'axios';

export async function getServerData () {
    debugger;
    const searchResults = await axios.get("/api/listings");
    console.log('SEARCH RESULTS: ', searchResults);

        return {
            type: types.SEARCH_RESULTS,
            payload: searchResults.data.data,
        }
    ;
    
        
  
    
};