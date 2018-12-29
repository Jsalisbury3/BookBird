import React from 'react';
import Landing from './landing';
import Header from '../universal/header';
import Nav from '../universal/nav';
import SearchBar from './search_bar'

function Index(){
    return (
        <div>
            <SearchBar/>
            <Landing/>
        </div>
    )
}


export default Index