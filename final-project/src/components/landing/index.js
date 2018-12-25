import React from 'react';
import Landing from './landing';
import Header from '../universal/header';
import Nav from '../universal/nav';
import SearchBar from './search_bar'

function Index(){
    return (
        <div>
        <Header/>
        <SearchBar/>
        <Landing/>
        <Nav/>
        </div>
    )
}


export default Index