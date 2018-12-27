import React from 'react';
import {Link} from 'react-router-dom';
import AddBook from '../addBook/';
import Search from '../landing/';

export default () => (
    <footer className="uni-footer">
        <div className="searchButton">
            <Link to={"/"}><button>Home</button></Link>
        </div>

        <div className="postButton">
            <Link to={"/AddBook"}><button>Post button</button></Link>
        </div>

    </footer>

)
 