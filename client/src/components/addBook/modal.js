import React, { Component } from 'react';
// import App from '../../App';
import './modal.css';
import 'materialize-css';
import success from './images/successlogo.png';
import { Link } from 'react-router-dom';


class Modal extends Component {
    // componentDidMount() {
    //     document.getElementsByClassName('modalIsbn')[0].style.display = "none";
    //
    // }

    closeModal = () => {
        console.log('close modal');
        document.getElementsByClassName('modalPageContainer')[0].style.display = "none";
    }

    render() {
        return (

            <div className="modalPageContainer">

                 <div className="modalContainer">
                    <div className="modalHeader">
                        <div className="successImage">
                             <img src={success}/>
                        </div>

                        <div className="closeModalContainer">
                            <div onClick={this.closeModal}>X</div>
                         </div>
                     </div>

                     <div className="modalBody">
                        <div className="bodyHeader">Success</div>
                         <div className="bodyMainText">You have successfully posted a book!</div>
                     </div>
                     <div className="modalFooter">
                         <div className="searchButtonContainer">
                             <Link onClick={this.closeModal} className="searchButtonModal" to="/">
                                 <div>
                                     Home
                                 </div>
                             </Link>
                         </div>
                         <div className="postButtonContainer">
                             <Link onClick={this.closeModal} className="postButtonModal" to="/addbook">
                                 <div>
                                    Post Again
                                 </div>
                             </Link>
                         </div>
                     </div>
                  </div>
            </div>
        
    
        )
        
        
    }

}

export default Modal;