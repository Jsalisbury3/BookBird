import React, {Component} from 'react';
import { connect } from 'react-redux'; // converts component to redux and turns specified parts of state into props
import { getServerData } from '../../actions/listing.js'; // Importing the actions index and getting specific functions out of the file
import axios from 'axios';
import ListItem from './listItem';
import SearchBar from './search_bar';


class ResultList extends Component {
    // state = {
    //     data : null
    // };

    // getServerData = () => {
    //     const searchResults = axios.get("/api/listings").then( (response) => {
    //         this.getRowData(response.data.data);
    //     });
    // };

    receiveFilterResults = (response) => {
        console.log('Receive Filter Results: ', response);
        this.getRowData(response.data.data);
    };

    getRowData = (results) => {
        debugger;
        const listItems = results.map((item, index) => {
            return (
                <ListItem key={index} about={item}/>
            )
        });
        return listItems;
    };

    componentDidMount = async () => {
        debugger;
        const serverData = await this.props.getServerData();
        console.log('Server Data: ', serverData)
        this.getRowData(serverData);
    };

    render() {
        console.log('Results List PROPS: ', this.props);
        return (
            <div className='search-results-container'>
                <SearchBar function={this.receiveFilterResults}/>
                hello
            </div>
        )
    }
}

// Takes relevant pieces of state and puts it in the component as props
function mapStateToProps(state) {
    console.log('Redux STATE: ', state);
    debugger;
    return {
        searchResults: state.listing.searchResults
    }
}
export default connect(mapStateToProps, {
    getServerData: getServerData
})(ResultList);

