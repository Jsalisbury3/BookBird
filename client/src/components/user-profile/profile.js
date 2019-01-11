import React, {Component} from 'react';
import UserPostList from './userPostList';
import 'materialize-css';
import 'material-icons';
import userphoto from './images/professor.jpg';
import axios from "axios/index";
import logout24 from './images/logout-24.png'

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
                <button onClick={this.signOut} className='logOut btn btn-small right'>Log Out<img src={logout24}/></button>
                <div className='user-image-container circleBase'>
                    <img src={userphoto}/>               
                    <div className='opacitySlip'><i className='material-icons center'>add_a_photo</i></div>
                </div>
                <UserPostList/>
            </div>
        );
    }
}
