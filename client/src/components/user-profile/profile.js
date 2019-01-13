import React, {Component} from 'react';
import UserPostList from './userPostList';
import {withRouter} from 'react-router-dom';
import 'materialize-css';
import 'material-icons';
import {connect} from 'react-redux';
import {removeTokenAndRow} from '../../actions/sign_out'
import userphoto from './images/doublebirds.jpg';
import logout24 from './images/logout-24.png'
import {bindActionCreators} from "redux";

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
        console.log(this.state.photoArray);
        this.addPhotoToMultiPhotoContainer();
    };


    render() {
        return (
            <div className='profile-main-container'>
                <button onClick={this.callActionSignOut} className='logOut btn btn-small right'>Log Out<img src={logout24}/>
                </button>
                <div className='user-image-container circleBase'>
                    <img src={!this.state.photo ? userphoto : URL.createObjectURL(this.state.photo)}/>

                    <label className="opacitySlip" htmlFor="profilePhotoInput"><i
                        className='material-icons center'>add_a_photo</i></label>
                    <input id="profilePhotoInput" type="file" name="photo" capture="camera" accept="image/*"
                           onChange={this.fileSelectedHandler}/>

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