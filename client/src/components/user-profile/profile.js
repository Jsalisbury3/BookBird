import React, {Component} from 'react';
import UserPostList from './userPostList';
import 'materialize-css';
import 'material-icons';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        const state = {
            
        }
    }
    render(){
        return(
            <div className='profile-main-container'>
            <div className='user-image-container circleBase'>
            
            <img className='circle responsive-img' src={this.state.userImageUrl}/>
            <div className='opacitySlip' />
            <div><i className='materialize-icons'>add_a_photo</i></div>
            </div>
            
            <div className='signOut'>
            <button className='btn btn-small'>Log Out</button>
            </div>
            <UserPostList/>
            </div>
        );
    }
}