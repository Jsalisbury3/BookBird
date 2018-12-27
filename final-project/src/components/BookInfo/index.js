import React from 'react';
import dummyData from '../../data/dummy';
import BookInfo from './bookData';

// const user =

//     {
//         id: '00',
//         title: 'biology the core',
//         ISBN: 9780134287829,
//         edition: '2nd edition',
//         author: 'Simon',
//         condition: 'used',
//         price: 35,
//         sellersComment: 'for Bio 181',
//         sellersEmail: 'jordan@sfstate.edu',
//         images: ['9780134152196.jpeg']
//     };


const Index = (props) => {
    console.log(props)
    const id=props.match.params.bookId;
    const bookData=dummyData.filter(value => id===value.id);
    console.log(bookData);
    const {title,ISBN,edition,author,condition,sellersEmail,sellersComment,price}=bookData[0];
    return (
        <div className='main-container'>
                    <BookInfo  title={title}
                      ISBN={ISBN}
                      edition={edition}
                      author={author}
                      condition={condition}
                      sellersEmail={sellersEmail}
                      sellersComment={sellersComment}
                      price={price}/>
        </div>
    )
};

export default Index;

