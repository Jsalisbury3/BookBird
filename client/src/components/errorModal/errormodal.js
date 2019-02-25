import React, {Component} from 'react';
import './errormodal.css';
import UserPost from '../user-profile/userPost';
import axios from 'axios';
import UserPostList from '../user-profile/userPostList';


class ErrorModal extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        isOpen: false
    };


    hideModal = () => {
        document.getElementById("errorModal").classList.add("hide");
    }

    render() {
        console.log(this.props);
        return (
            <div id={"errorModal"} className="errorModal hide col l12 m12 s12">
                <div className="profile-modal-content center-align">
                    <p className="deleteTitle">Error posting book</p>
                    <button className="yesButton s12 offset-s5 btn red" onClick={this.hideModal}>okay</button>
                </div>
            </div>
        )
    }
}

export default ErrorModal;