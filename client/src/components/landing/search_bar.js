import React, {Component} from 'react';
import searchIcon from '../universal/images/search_icon.png'
import { searchFilter } from '../../actions/search';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ListItem from './listItem';
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'

class SearchBar extends Component{
    constructor(props){
        super(props);
        const state = {
            ISBN: ''
        }
    }

    handleInputs = async (event)=>{

        console.log("change event name", event.target.name)
        console.log("change event value", event.target.value)
        
        await this.setState({
            [event.target.name]: event.target.value,
        })

        const request = {...this.state};

        this.props.searchFilter(request);
        
    }

    getRowData = (results) => {
        console.log('GET row data: ',results)
        
        const listItems = results.map((item, index) => {
            return (
                <ListItem key={index} about={item}/>
            )
        });
        return listItems;
    };

    componentDidUpdate = () => {
        
    }
    // receiveFilterResults = () => {
    //     const searchResults = axios.get('http://localhost:7000/filter').then( (response)=>{
    //     console.log('Receive Filter Results: ', response);
    //     this.getRowData(response.data.data);
    //     })
    // }
    
    // displayFilterResults = (results) => {
    //     const rowData = results.map( (item, index) => {
    //         return (
    //             <ListItem key={index} about={item}/>
    //         )
    //     })
        
    //     this.setState({
    //         data: rowData,
    //     })

    //     return rowData;
    // }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.setState({
            ISBN: ''
        })
        console.log('handle submit', this.state)
    }
    render(){
        // console.log('Props: ', this.props);
        // console.log('State: ', this.state)

        let displayFiltered = this.getRowData(this.props.filterResults);
        return(
            <div className="search-bar-container">
                {/* <form className="searchForm" onSubmit={this.handleSubmit}> */}
                <div className="searchbar-i-container"><i className="material-icons">search</i></div>
                <input name="ISBN" id="searchInput" className="searchInput" placeholder="Search by Title/Author/ISBN#" onChange={this.handleInputs} autoComplete="off"/>
                        
                    
                {/* </form> */}
            </div>
        )
    }   
}

function mapStateToProps(state) {

    console.log('Search Bar State: ', state);
    return {
        filterResults: state.searchBarReducer.filterResults
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchFilter: bindActionCreators(searchFilter, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);