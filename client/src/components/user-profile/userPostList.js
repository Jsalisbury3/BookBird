import React, {Component} from 'react';
import UserPost from './userPost';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import './profile.css';
import 'materialize-css';



class UserPostList extends Component {
    state = {
        data : null
    };

    getUserProfileListings = async (results) => {
        if(!results.data.success) {
            console.log("no matches found");
            let listItems = "No listings found";
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
        const hasToken = localStorage.getItem("Token");
        if(!hasToken) {
            this.props.history.push("/SignIn");
        } else {
            this.getUserPosts();
        }
    };


    render() {
        return (
            <div className='user-posts-container'>
                <div className="profileListings">{this.state.data === "No listings found" ? <div className="emptyListings">No Listings Found. Post some books!</div> : this.state.data}</div> 
                {/* <div className='samplePost'>{!this.state.data ? "no listings found" : ''}</div> */}
            </div>
        )
    }
}

export default withRouter(UserPostList)

// {!this.state.data ? "no listings found" : ''}