import React, {Component} from 'react';
import dummyData from '../../data/dummy';
import ListItem from './listItem';


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

    createListItems=()=>{
        const books= dummyData.map((listItem,index)=>{
            return (
                <ListItem
            )
        })
        //map through the array of objects from dummy and pass into listItem component as props to fill in the component
        this.setState={
            
        }

    render(){
        return(
            <div className='main-container'>
                <header className="header">This is the header</header>
                <div className='main-content'>
                    <form>
                        <input></input>
                    </form>
                    <div>
                        <img/>
                        <p>Title</p>
                        <p>Author</p>
                        <p>Course</p>
                        <p></p>Price</p>
                    </div>                                                                    
                    <div>
                        </img>
                        <p>Title</p>
                        <p>Author</p>
                        <p>Course</p>
                        <p>Price</p>
                        
                    </div>




                </div>

                <nav>two buttons will go here</nav>
            </div>

        )
    }    
}