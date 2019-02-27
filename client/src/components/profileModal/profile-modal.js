import React, { Component } from 'react';
import './profile-modal.css';
import UserPost from '../user-profile/userPost';
import axios from 'axios';
import UserPostList from '../user-profile/userPostList';


class ProfileModal extends Component {
    constructor(props){
        super(props)
    }
    state = {
        isOpen: false
    };

    open = () => this.setState({isOpen: true});

    close = () => this.setState({isOpen: false});

    deleteAndClose=() => {
        this.props.delete()
        this.close()
    }

    render(){
        console.log(this.props);

        if(this.state.isOpen){
            return (
                <div className="profileModal col l12 m12 s12">
                    <div className="profile-modal-content center-align">
                        <p className="deleteTitle">Are you sure you want to delete this post?</p>
                        <button className="noButton btn green"onClick={this.close}>No</button>
                        <button className="yesButton btn red" onClick={this.deleteAndClose}>Yes</button>
                    </div>                       
                </div> 
            )
        }

        return (
                    <button className='btn red center' onClick={this.open}><i 
                    className='large material-icons center'>delete_outline</i></button>
                
        );
    }
}

export default ProfileModal;