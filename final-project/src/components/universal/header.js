import React from 'react';
import bookBirdLogo from './images/bookBird.jpg';
import sfStateLogo from './images/San-Francisco-State-University-logo.png';

export default ()=>{
    
    
        return(
        <header className='uni-header'>
            <img className='birdLogo' src={bookBirdLogo}/>  
            <img className='universityLogo' src={sfStateLogo}/>
        </header>
    
    );
    
}