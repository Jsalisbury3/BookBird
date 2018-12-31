import React, {Component} from 'react';
import axios from 'axios';
import dummyData from '../../data/dummy';
import ListItem from './listItem';
import SearchBar from './search_bar';


class ResultList extends Component {
    state = {
        data : null
    };

    getServerData = () => {
        const searchResults = axios.get("http://www.localhost:7000/listings").then( (response) => {
            this.getRowData(response.data.data);
        });
    };

    receiveFilterResults = (response) => {
        // const searchResults = axios.get('http://www.localhost:7000/filter').then( 
       
        console.log('Receive Filter Results: ', response);
        this.getRowData(response.data.data);
        // })
    }

    getRowData = (results) => {
        const listItems = results.map((item, index) => {
            return (
                <ListItem key={index} about={item}/>
            )
        });
        this.setState({
            data: listItems
        });
        return listItems;
    };

    componentDidMount = () => {
        this.getServerData();
    };

    render() {
        return (
            <div className='search-results-container'>
                <SearchBar function={this.receiveFilterResults}/>
                {this.state.data}
                
            </div>
        )
    }
}

export default ResultList