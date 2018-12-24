import React, {Component} from 'react';
import ResultsList from './resultList';




export default class LandingPage extends Component {
    constructor(props){
        super(props);
        const state = {
            title:'',
            author: '',
            course:'',
            price: null
        }
    }

    handleInputChange = (event) => {
        console.log( "event change name", event.target.name)
        console.log("event change value", event.target.value)
        this.setState({
            [event.taget.name]: event.target.value                        
        })
    };

    render(){
        return(
            <div className='main-container'>
                <header className="header">This is the header</header>
                <div className='main-content'>
                    <form>
                        <input></input>
                    </form>
                    <List/>
                <nav>two buttons will go here</nav>
                </div>
            </div>
        )
    }    
}