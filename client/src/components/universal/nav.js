import React from 'react';
import {Link} from 'react-router-dom';
import SearchImg from './images/search-2.png'
import AddBookImg from './images/addBook.png'
import ProfileIcon from './images/msn-people-person-profile-user-icon--icon-search-engine-16.png'
import './universal.css';
import AddBook from '../addBook';
import Search from '../landing';

export default () => (
    <footer className="uni-footer">
        <div className={'SearchIcon'}>
            <Link to={"/"}><img alt={'SearchIcon'} className={'SearchPicture'} src={SearchImg}/></Link>
        </div>

        <div className={'AddBookIcon'}>
            <Link to={"/AddBook"}><img alt={'AddBookIcon'} className={'BookPicture'} src={AddBookImg}/></Link>
        </div>
        <div className={'ProfileIcon'}>
            <Link to={"/Sign"}><img alt={ProfileIcon} className={'ProfilePicture'} src={ProfileIcon}/></Link>
        </div>
    </footer>

)
 
