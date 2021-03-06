import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SearchImg from './images/search-2.png'
import AddBookImg from './images/addBook.png'
import ProfileIcon from './images/msn-people-person-profile-user-icon--icon-search-engine-16.png'
import './universal.css';
import { withRouter } from 'react-router-dom';


export default withRouter((props)=> {
    const dontShow = ['/'];
    if (dontShow.includes(props.location.pathname)) return null;
    return (
        <footer className="row uni-footer">
            <div className={'SearchIcon'}>
                <Link to={"/Landing"}><img alt={'SearchIcon'} className={'SearchPicture'} src={SearchImg}/>
                    <h6 id='SearchTitle'>Search</h6>
                </Link>

            </div>
            <div className={'AddBookIcon'}>
                <Link to={"/AddBook"}><img alt={'AddBookIcon'} className={'BookPicture'} src={AddBookImg}/>
                    <h6 id='AddBookTitle'>Add Book</h6>
                </Link>
            </div>
            <div className={'ProfileIcon'}>
                <Link to={"/SignIn"}><img alt={ProfileIcon} className={'ProfilePicture'} src={ProfileIcon}/>
                    <h6 id='ProfileTitle'>Profile</h6>
                </Link>
            </div>
        </footer>
    )
})


