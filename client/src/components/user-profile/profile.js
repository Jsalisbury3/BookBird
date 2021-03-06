import React, {Component, Fragment} from 'react';
import UserPostList from './userPostList';
import {withRouter} from 'react-router-dom';
import 'materialize-css';
import 'material-icons';
import defaultPhoto from './images/default-user-profile-image.png';
import {connect} from 'react-redux';
import {removeTokenAndRow} from '../../actions/sign_out'
import logout24 from './images/logout-24.png'
import {bindActionCreators} from "redux";
import schoolLogo from './images/sfsu_profile.jpg';
import axios from 'axios';
import Header from './../universal/header'
import Nav from './../universal/nav'
import loadingGif2 from '../addBook/images/loadingGif2.gif'

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: null,
        }
    }

    componentDidMount = () => {
        const hasToken = localStorage.getItem("Token");
        if(!hasToken) {
            this.props.history.push("/SignIn");
        } else {
            document.getElementById("loadingGif2").style.visibility = 'visible';
            this.getProfileUrl();
        }

    }

    handleUrlToSetState = (response) => {
        console.log("LOOOOK ATTT MEEEE: ", response);
        document.getElementById("loadingGif2").style.visibility = 'hidden';
        if (response.data.data[0].profile_photo_url) {
            this.setState({
                photo: `https://s3-us-west-2.amazonaws.com/book-bird-test-bucket/${response.data.data[0].profile_photo_url}`
            });
            console.log("state in profile url: ", this.state.photo);
            document.getElementById("loadingGif2").style.visibility = 'hidden';
        }
    }

    getProfileUrl = () => {
        axios({
            method: 'get',
            url: '/api/UserProfileUrl',
            headers: {
                token: localStorage.getItem('Token'),
            }
        }).then((response) => {
            this.handleUrlToSetState(response);
        })
    };

    callActionSignOut = () => {
        this.props.removeTokenAndRow();
        localStorage.removeItem("Token");
        this.props.history.push('/SignIn');
    }

    fileSelectedHandler = async event => {
        console.log(event.target.files[0]);
        const newImage = event.target.files[0];
        await this.setState({
            photo: URL.createObjectURL(newImage)
        });
        console.log("TYPE", newImage.type);
        const prep = await axios({
            // Authorization: `AWS ${accessKeyId}: ${secretAccessKey}`,
            method: 'get',
            url: `/api/prepUpload?fileType=${newImage.type}`,
            ContentType: newImage.type

        })

        const {getUrl, key} = prep.data;

        await axios.put(getUrl, newImage, {
            headers: {
                'Content-Type': newImage.type
            }
        })
        let saveImageParams = {
            key,
            fileType: newImage.type,
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
                <div className='profile-main-container col m6 offset-m3'>
                    <div className="col s12 m12 l12 sign-out-button-container">
                    <button onClick={this.callActionSignOut} className='logOut btn right yellow darken-2'><img
                            src={logout24}/>
                        </button>
                    </div>
                    <div className='col s12 m12 l12 center-align profile-image-container'>
                        <div className='user-image-container circleBase'>
                            <img src={loadingGif2} id="loadingGif2"alt=""/>
                            <img src={this.state.photo ? this.state.photo : defaultPhoto}/>
                            <label className="opacitySlip" htmlFor="profilePhotoInput"><i
                                className='material-icons center'>add_a_photo</i></label>
                            <input id="profilePhotoInput" type="file" name="photo" capture="camera" accept="image/*"
                                onChange={this.fileSelectedHandler}/>
                        </div>
                    </div>
                    <div className="profile-main-content">
                        <div className="col user-posts-header center-align s12 m12 l12">Account Listings</div>
                        <UserPostList/>
                    </div>                  
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