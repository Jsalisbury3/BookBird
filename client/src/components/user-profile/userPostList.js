import React, {Component} from 'react';
import UserPost from './userPost';
import axios from 'axios';
import './profile.css';
import 'materialize-css';


export default class UserPostList extends Component {
    state = {
        data : null
    };

    getServerData = () => {
        const searchResults = axios.get("http://www.localhost:7000/listings").then( (response) => {
            this.getRowData(response.data.data);
        });
    };

    getRowData = (results) => {
        const listItems = results.map((item, index) => {
            return (
                <UserPost key={index} about={item}/>
            )
        });
        this.setState({
            data: listItems
        });
        return listItems;
    };

    componentDidMount = () => {
        this.getServerData();
    };

    render() {
        return (
            <div className='user-posts-container'>
                {this.state.data}
                <div className='samplePost'></div>
            </div>
        )
    }
}