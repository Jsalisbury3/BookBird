import React, {Component} from 'react';
import ResultList from './resultList';
import SearchBar from './search_bar'
import './landing.css';

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            course: '',
            price: null
        }
    }

    handleInputChange = (event) => {
        console.log("event change name", event.target.name);
        console.log("event change value", event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        return (
            <div>
                <SearchBar/>
                <ResultList/>
            </div>
        )
    }
}