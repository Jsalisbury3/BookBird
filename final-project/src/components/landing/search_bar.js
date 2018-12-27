import React, {Component} from 'react';
import searchIcon from '../universal/images/search_icon.png'

class SearchBar extends Component{
    // constructor(){
    //     super(props)
    //     const state = {
    //         ISBN: ''
    //     }
    // }

    handleInputs = (event)=>{
        console.log("change event name", event.target.name)
        console.log("change event value", event.target.value)
        
    }

    handleSubmit = (event)=>{
        this.setState({
            ISBN: ''
        })
        event.preventDefault();
        console.log('handle submit', this.state)
    }
    render(){
        return(
            <div className="search-bar-container">
                <form onSubmit={this.handleSubmit}>
                    <input className="search-text" placeholder="Search by ISBN" onChange={this.handleInputs}></input>
                    {/*<button><img src={searchIcon} className="search-bar-icon"/></button>*/}
                </form>
            </div>
        )
    }   
}

export default SearchBar