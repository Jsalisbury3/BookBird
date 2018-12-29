import React from 'react';
import dummyData from '../../data/dummy';
import ListItem from './listItem';
import axios from 'axios';

export default async props => {
    // const searchResults = dummyData.map((item,index)=>{
    //     console.log(item);
    //     return (
    //         <ListItem key={index} about={item}/>
    //     )
    // });
    // console.log("search", searchResults);


    const searchResults = await axios.get("http://www.localhost:7000/listings");
    console.log("SEARCHHHHHH: ", searchResults);
    const listItems = searchResults.data.data.map((item, index) => {
        console.log(item);
        return (
            <ListItem key={index} about={item}/>
        )
    });

    console.log("resultshere: :", listItems);
    return (
        <div className='search-results-container'>
            {searchResults}
        </div>
    )
}