import React, {Component} from 'react';
import { connect } from 'react-redux'; // converts component to redux and turns specified parts of state into props
import { getServerData } from '../../actions/listing'; // Importing the actions index and getting specific functions out of the file
import { searchFilter } from '../../actions/search';
import { bindActionCreators } from 'redux';
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
        console.log('GET row data: ',results)
        
        const listItems = results.map((item, index) => {
            return (
                <ListItem key={index} about={item}/>
            )
        });
        return listItems;
    };

    componentDidMount = () => {
        debugger;
        console.log('PROPS: ', this.props);
        this.props.getServerData();
        // this.getRowData(serverData);

    };

    render() {
        console.log('Results List PROPS: ', this.props);
        let listings = this.getRowData(this.props.searchResults);
        return (
            <div className='search-results-container'>
                <SearchBar function={this.receiveFilterResults}/>
                {listings}
            </div>
        )
    }
}

// Takes relevant pieces of state and puts it in the component as props
function mapStateToProps(state) {
    console.log('Redux STATE: ', state);
    debugger;
    return {
        searchResults: state.listing.searchResults,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getServerData: bindActionCreators(getServerData, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultList);

// , {
//     getServerData: getServerData
// },