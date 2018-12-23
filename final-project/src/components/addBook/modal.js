import React from 'react';
import App from '../../App';
import './modal.css';

const Modal = () => {
    return (
        <div className="modalPageContainer">
            <div className="modalContainer">
                <div className="modalHeader">
                    <div>Success</div>
                </div>
                <div className="modalBody">
                    <div>You have successfully posted a book!</div>
                </div>
                <div className="modalFooter">
                    <div className="searchButtonContainer">
                        <button className="searchButton" name="Search">Search</button>
                    </div>
                    <div className="postButtonContainer">
                        <button className="postButton" name="Search">Post Again</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;