<<<<<<< HEAD
import React, { Component } from 'react';
import Modal from './modal';

class Post extends Component {
    render() {
      return (
        <div>
            <Modal/>
        </div>
      );
    }
  }
  
  export default Post;
=======
import React from 'react';
import AddBook from './addBook';
import Header from '../universal/header';
import Nav from '../universal/nav';
import '../universal/universal.css';

function AddBookIndex() {
    return (
        <div>
            <AddBook/>
        </div>

    )
}

export default AddBookIndex
>>>>>>> af4e665877a2b2c837fb5b19e7a76492c66fc2d5
