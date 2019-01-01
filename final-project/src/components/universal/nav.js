import React from 'react';
import {Link} from 'react-router-dom';
import AddBook from '../addBook/';
import Search from '../landing/';
import UserProfile from '../user-profile/profile'

export default () => (
    <footer className="uni-footer">
        <div className="searchButton btn">
            <Link to={"/"}>Home</Link>
        </div>

        <div className="postButton btn">
            <Link to={"/AddBook"}>Post button</Link>
        </div>

        <div className="profileButton btn">
            <Link to={"/UserProfile"}>User Profile</Link>
        </div>

    </footer>

)
 