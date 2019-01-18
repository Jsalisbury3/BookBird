import React, {Component} from 'react';
import UserPostList from './userPostList';
import {withRouter} from 'react-router-dom';
import 'materialize-css';
import 'material-icons';
import defaultPhoto from './images/default-user-profile-image.png';
import {connect} from 'react-redux';
import {removeTokenAndRow} from '../../actions/sign_out'
import logout24 from './images/logout-24.png'
import {bindActionCreators} from "redux";
import axios from 'axios';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: null,
        }
    }

    callActionSignOut = () => {
        this.props.removeTokenAndRow();
        localStorage.clear();
        this.props.history.push('/SignIn');
    }

    fileSelectedHandler = async event => {
        console.log(event.target.files[0]);
        const newImage = event.target.files[0];
        await this.setState({
            photo: newImage
        });
        const prep = await axios({
            // Authorization: `AWS ${accessKeyId}: ${secretAccessKey}`,
            method: 'get',
            url: `/api/prepUpload?fileType=${this.state.photo.type}`,
            ContentType: this.state.photo.type

        })

        const {getUrl, key} = prep.data;
        
        await axios.put(getUrl, this.state.photo, {
            headers: {
                'Content-Type': this.state.photo.type
            }
        })
        let saveImageParams = {
            key,
            fileType: this.state.photo.type,
        }
    
        console.log('saveImage Params: ', saveImageParams);
    
        await axios({
            method: 'post',
            url: `/api/save-profile-image`,
            'Content-Type': 'application/json',
            headers: {
                token: localStorage.getItem('Token'),
            },
            data: saveImageParams
        })
    };
    

    render() {
        return (
            <div className='profile-main-container'>

                <button onClick={this.callActionSignOut} className='logOut btn btn-small right'><img src={logout24}/>
                </button>
                <div className='user-image-container circleBase'>
                    <img src={!this.state.photo ? defaultPhoto : URL.createObjectURL(this.state.photo)}/>                      
                    <label className="opacitySlip" htmlFor="profilePhotoInput"><i className='material-icons center'>add_a_photo</i></label>
                    <input id="profilePhotoInput" type="file" name="photo" capture="camera" accept="image/*" onChange={this.fileSelectedHandler}/>
                    

                </div>
                <UserPostList/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("state: ", state);
    return {
        signInResults: state.signInReducer.signInId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeTokenAndRow: bindActionCreators(removeTokenAndRow, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));