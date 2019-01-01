import React, {Component} from 'react';
import ResultList from '../universal/resultList';


export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        const state = {
            title: '',
            author: '',
            course: '',
            price: null
        }
    }

    handleInputChange = (event) => {
        console.log("event change name", event.target.name)
        console.log("event change value", event.target.value)
        this.setState({
            [event.taget.name]: event.target.value
        })
    };

    render() {
        return (
            <div>
                <ResultList/>
            </div>
        )
    }
}