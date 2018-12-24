import React from 'react';
import dummyData from '../../data/dummy';
import ListItem from './listItem';

export default props => {
    // map through the array of objects from dummy and pass into listItem component as props to fill in the component

    const searchResult= dummyData.map((item,index)=>{
        return (
            <ListItem key={index} about={item}/>
        )
    });
    return(
        <div className='search-results-container'>
            {searchResult}
        </div>
    )
}