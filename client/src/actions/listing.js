import types from './types';
import axios from 'axios';


function requestData() {
    axios.get("/api/listings").then((res)=>{
        console.log('RES', res);
        return res.data.data
    });

}
export function getServerData () {
    debugger;
    

    return {
        type: types.SEARCH_RESULTS,
        payload: requestData()
    }

    
        
  
    
};