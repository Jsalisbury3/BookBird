import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class UserPost extends Component {
    constructor(props) {
        super(props);
    }
    closeModal=()=>{
        document.getElementsByClassName('profileModal')[0].style.display = "none"
    }

    displayModal=()=>{
        document.getElementsByClassName('profileModal')[0].style.display = "block"
    }

    render() {
        const {title, edition, author, book_condition, course, price, ID, listingID, bookImage, profile_photo_url} = this.props.about;
        return (
            <div className='listItem'>
                <Link to={`/BookInfoIndex/${ID}`}>
                    <div className='itemImageContainer'>
                        <img className='itemImage' src={bookImage}/>
                    </div>
                    <div className='itemDetails itemListings'>
                        <p>{title}</p>
                        <p>{author}</p>
                        <p id="profileListings"
                           className={(book_condition === 'Like New') ? 'Like_New profileListings' : book_condition}>{book_condition}</p>
                    </div>
                </Link>
                <div className='delete-btn-container'>
                    <p className="profilePrice">${price}</p>
                    {/* <button className='waves-effect btn red center' onClick={this.props.delete}><i
                        className='large material-icons center'>delete_outline</i></button> */}
                    <button className='waves-effect btn red center' onClick={this.displayModal}><i
                        className='large material-icons center'>delete_outline</i></button>
                </div>
                <div className="profileModal">
                        <div className="modal-content">
                            <p className="deleteTitle">Are you sure you want to delete this post?</p>
                            <button className="btn green"onClick={this.closeModal}>No</button>
                            <button className="btn red"onClick={this.props.delete}>Yes</button>
                        </div>                       
                </div>
            </div>
            
        )
    }

}

export default UserPost