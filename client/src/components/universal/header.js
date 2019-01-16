import React, {Component, Fragment} from 'react';
// import bookBirdLogo from './images/bookBird.jpg';
import sfStateLogo from './images/San-Francisco-State-University-logo.png';
import bookBirdLogo from './images/BookBirdOnlyImgWhite.png'
import bookBirdText from './images/BookBirdOnlyTextWhite.png'
import sfSymbol from './images/SFSymbol.png';

export default ()=>{
    
    
        return(
            <Fragment>
                <nav className="uni-header black">
                    <img src={bookBirdLogo} alt={"birdlogo"} className="birdLogo"/>
                    <img src={bookBirdText} alt={"birdlogotext"} className="birdLogoText"/>
                    <img src={sfSymbol} alt={"sfSymbol"} className="sfSymbol"/>
                </nav>

            </Fragment>

        // <header className='uni-header'>
        //     <img alt={"birdlogo"} className='birdLogo' src={bookBirdLogo}/>
        //     <img alt={"university"} className='universityLogo' src={sfStateLogo}/>
        // </header>
    
    );
    
}