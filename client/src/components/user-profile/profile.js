import React, {Component} from 'react';
import UserPostList from './userPostList';
import {withRouter} from 'react-router-dom';
import 'materialize-css';
import 'material-icons';
import userphoto from './images/doublebirds.jpg';
import axios from "axios/index";
import logout24 from './images/logout-24.png'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo:null,
        }
    }


    signOut = () => {
        axios({
            method: 'get',
            url: '/api/SignOut',
            headers: {token: localStorage.getItem('Token')},
        }).then((response) => {
            localStorage.clear();
            this.props.history.push('/SignIn');
        })
    };
    fileSelectedHandler = async event => {
        console.log(event.target.files[0])
        const newImage = event.target.files[0];
        await this.setState({
            photo: newImage
        })
            console.log(this.state.photoArray);
            this.addPhotoToMultiPhotoContainer();
    }


    render(){
        return(
            <div className='profile-main-container'>
                <button onClick={this.signOut} className='logOut btn btn-small right'><img src={logout24}/></button>
                <div className='user-image-container circleBase'>
                    <img src={!this.state.photo ? userphoto : URL.createObjectURL(this.state.photo)}/>     
                    
                    <label className="opacitySlip" htmlFor="profilePhotoInput"><i className='material-icons center'>add_a_photo</i></label>
                    <input id="profilePhotoInput" type="file" name="photo" capture="camera" accept="image/*" onChange={this.fileSelectedHandler}/>
                    
                </div>
                <UserPostList/>
            </div>
        );
    }
}

export default withRouter(UserProfile);