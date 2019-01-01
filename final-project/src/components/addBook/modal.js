import React, { Component } from 'react';
import App from '../../App';
import './modal.css';
import 'materialize-css';
import success from './images/successlogo.png'

class Modal extends Component {
    render() {
        return (
            <div className="modalPageContainer">
                <div className="modalContainer">
                    <div className="modalHeader">
                        <div className="successImage">
                            <img src={success}/>
                        </div>
                        
                        <div className="closeModalContainer">
                            <div >X</div>
                        </div>
                    </div>
                    
                    <div className="modalBody">
                        <div className="bodyHeader">Success</div>
                        <div className="bodyMainText">You have successfully posted a book!</div>
                    </div>
                    <div className="modalFooter">
                        <div className="searchButtonContainer">
                            <a className="btn searchButtonModal" name="Search">Search</a>
                        </div>
                        <div className="postButtonContainer">
                            <a className="btn postButtonModal" name="Post">Post Again</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Modal;