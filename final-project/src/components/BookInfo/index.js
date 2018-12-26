import React from 'react';
import BookData from './bookData'
import './app.css';

const user =

    {
        id: '00',
        title: 'biology the core',
        ISBN: 9780134287829,
        edition: '2nd edition',
        author:   'Simon',
        condition: 'used',
        price: 35,
        sellersComment: 'for Bio 181',
        sellersEmail:  'jordan@sfstate.edu',
        images: ['9780134152196.jpeg']
    };


const Index = () => {
    return (
        <div className='main-container'>
            <div className='bookContainer'>
               <BookData title={user.title} ISBN={user.ISBN} edition={user.edition} author={user.author} condition={user.condition} sellersEmail={user.sellersEmail} sellersComment={user.sellersComment}price={user.price} />

            </div>
        </div>
     )
};

export default Index;

