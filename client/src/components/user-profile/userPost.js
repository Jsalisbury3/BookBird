import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ProfileModal from '../profileModal/profile-modal';


class UserPost extends Component {
    constructor(props) {
        super(props);
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
                        <ProfileModal bookId = {ID} delete={this.props.delete}/>
                </div>
            </div>
            
        )
    }

}

export default UserPost