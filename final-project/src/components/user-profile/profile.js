import React, {Component} from 'react';
import ResultsList from '../universal/resultList';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        const state = {
            
        }
    }
    render(){
        return(

            <div className='profile-main-container'>
            <div className='user-image-container'>
            {/* <img src={this.state.userImageUrl}/> */}
            </div>
            <div className='signOut btn'/>
            <ResultsList/>
            </div>
        );
    }
}