import types from './types'
import axios from "axios/index";

export async function addBook() {
    console.log("state:", this.state);
    let request = {...this.state};
    const postInfo = axios({
        method: 'post',
        url: '/api/addListing',
        data: request,
    });
    return {
        type: types.POST_INFO,
        payload: postInfo.data.data
    }
};