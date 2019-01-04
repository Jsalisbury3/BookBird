import React, {Component} from 'react';
import searchIcon from '../universal/images/search_icon.png'
import axios from 'axios';

class SearchBar extends Component{
    constructor(props){
        super(props)
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

        axios({
            method: 'post',
            url: '/api/filter',
            data: request,

        }).then( (response) => { 
        
            this.props.function(response);
        })

        
    }

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
        console.log('Props: ', this.props);
        console.log('State: ', this.state)
        return(
            <div className="search-bar-container">
                <form className="searchForm" onSubmit={this.handleSubmit}>
                    <input name="ISBN" className="search-text" placeholder="Search by ISBN" onChange={this.handleInputs}></input>
                    <button className="searchInputButton"><img src={searchIcon} className="search-bar-icon"/></button>
                </form>
            </div>
        )
    }   
}

export default SearchBar