import React from 'react';

class SearchBar extends Component{
    constructor(){
        super(props)
        const state = {
            ISBM: ''
        }
    }

    handleInputs = (event)=>{
        console.log("change event name")
        
    }

    render(){
        return(
            <div className="search-container">
                
                <form onSubmit="">
                    <input placeholder="Search by ISBN" onChange={this.handleInputs}></input>
                </form>
            </div>
        (
    }   

}

