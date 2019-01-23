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
        debugger;
        if(!results.data.success) {
            console.log("no matches found");
            let listItems = "no listings found"
            await this.setState({
                data: listItems,
            });
        } else {
            let listItems = results.data.data.map((item, index) => {
                return (
                    <UserPost delete={this.deletePost(item.ID)} key={index} about={item}/>
                )
            });
            await this.setState({
                data: listItems,
            });
        }
    };

    getUserPosts = () => {
        debugger;
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
        console.log("delete runs");
        axios({
            url:"/api/UserProfile",
            method:"delete",
            data:{ID: id},
            headers: {token: localStorage.getItem('Token')},
        }).then((response) => {
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
                <div className='samplePost'>{!this.state.data ? "no listings found" : ''}</div>
            </div>
        )
    }
}

// {!this.state.data ? "no listings found" : ''}