import React from 'react';
import dummyData from '../../data/dummy';
import BookInfo from './BookData';

const Index = (props) => {
    
    const id=props.match.params.bookId;
    const bookData=dummyData.filter(value => id===value.id);
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

