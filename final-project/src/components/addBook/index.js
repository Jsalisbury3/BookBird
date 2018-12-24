import React from 'react';
import AddBook from './addBook';
import Header from '../universal/header';
import Nav from '../universal/nav';
import '../universal/universal.css';

function AddBookIndex() {
    return (
        <div>
            <Header/>
            <AddBook/>
            <Nav/>
        </div>

    )
}

export default AddBookIndex