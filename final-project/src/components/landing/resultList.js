import React from 'react';
import dummyData from '../../data/dummy';
import ListItem from './listItem';

export default props => {

    const searchResults= dummyData.map((item,index)=>{
        return (
            <ListItem key={index} about={item}/>
        )
    });
    return(
        <div className='search-results-container'>
            {searchResults}
        </div>
    )
}