import React, {Component, Fragment} from 'react';
import ResultList from './resultList';
import SearchBar from './search_bar'
import './landing.css';
import Header from './../universal/header'
import Nav from './../universal/nav'

export default class LandingPage extends Component {

    render() {
        return (
                    <div>
                        <ResultList/>
                    </div> 
        )
    }
}