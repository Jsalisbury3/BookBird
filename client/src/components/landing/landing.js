import React, {Component, Fragment} from 'react';
import ResultList from './resultList';
import SearchBar from './search_bar'
import './landing.css';
import Header from './../universal/header'
import Nav from './../universal/nav'

export default class LandingPage extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         title: '',
    //         author: '',
    //         course: '',
    //         price: null
    //     }
    // }
    //
    // handleInputChange = (event) => {
    //     console.log("event change name", event.target.name);
    //     console.log("event change value", event.target.value);
    //     this.setState({
    //         [event.target.name]: event.target.value
    //     })
    // };

    render() {
        return (
            <Fragment>
                <Header/>
                    <div>
                        <ResultList/>
                    </div>
                <Nav/>
            </Fragment>
            
        )
    }
}