import React from 'react';
import BookData from './bookData'


const user =

    {
        id: '00',
        title: 'biology the core',
        ISBN: 9780134287829,
        edition: '2nd edition',
        author: 'Simon',
        condition: 'used',
        price: 35,
        sellersComment: 'for Bio 181',
        sellersEmail: 'jordan@sfstate.edu',
        images: ['9780134152196.jpeg']
    };


const Index = () => {
    return (
        <div className='main-container'>
            <BookData title={user.title}
                      ISBN={user.ISBN}
                      edition={user.edition}
                      author={user.author}
                      condition={user.condition}
                      sellersEmail={user.sellersEmail}
                      sellersComment={user.sellersComment}
                      price={user.price}/>

        </div>
    )
};

export default Index;

