import React from 'react';
import bookBirdLogo from './images/bookBird.jpg';
import sfStateLogo from './images/San-Francisco-State-University-logo.png';

export default ()=>{
    
    
        return(
        <header className='uni-header'>
            <div className='birdLogo'>
                <img src={bookBirdLogo}/>
            </div>
            <div className='universityLogo'>
                <img src={sfStateLogo}/>
            </div>
        </header>
    
    );
    
}