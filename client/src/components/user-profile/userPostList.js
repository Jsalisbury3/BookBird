import React, {Component} from 'react';
import UserPost from './userPost';
import axios from 'axios';
import './profile.css';
import 'materialize-css';


export default class UserPostList extends Component {
    state = {
        data : null
    };

    getUserProfileListings = async (results) => {
        let listItems = results.data.data.map((item, index) => {
            return (
                <UserPost delete={this.deletePost(item.ID)} key={index} about={item}/>
            )
        });
        await this.setState({
            data: listItems,
        });
    };

    getUserPosts = () => {
        axios({
            method: 'get',
            url: '/api/UserProfile',
            headers: {token: localStorage.getItem('Token')},
        }).then( (results) => {
            console.log(results);
            this.getUserProfileListings(results);
        });
    };
    deletePost=(id)=>()=>{
        axios({
            url:"/api/UserProfile",
            method:"delete",
            data:{ID: id},
            headers: {token: localStorage.getItem('Token')},
        }).then( () => {
            this.getUserPosts();
        })
    };
    componentDidMount = () => {
        this.getUserPosts();
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