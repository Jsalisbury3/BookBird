import React, {Component} from 'react';
import UserPostList from './userPostList';
import 'materialize-css';
import 'material-icons';
import userphoto from './images/professor.jpg';
import axios from "axios/index";

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        const state = {}
    }


    signOut = () => {
        axios({
            method: 'get',
            url: '/api/SignOut',
            headers: {token: localStorage.getItem('Token')},
        }).then((response) => {
            localStorage.clear();

        })
    };



    render(){
        return(
            <div className='profile-main-container'>
            <div className='user-image-container circleBase'>
            
            <img className='circle responsive-img' src={userphoto}/>
            <div className='opacitySlip' />
            <div><i className='materialize-icons'>add_a_photo</i></div>
            </div>
            
            <div className='signOut'>
            <button onClick={this.signOut} className='btn btn-small'>Log Out</button>
            </div>
            <UserPostList/>
            </div>
        );
    }
}
