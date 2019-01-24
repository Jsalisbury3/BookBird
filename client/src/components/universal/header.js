import React, {Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
// import bookBirdLogo from './images/bookBird.jpg';
import sfStateLogo from './images/San-Francisco-State-University-logo.png';
import bookBirdLogo from './images/BookBirdOnlyImgWhite.png'
import bookBirdText from './images/BookBirdOnlyTextWhite.png'
import sfSymbol from './images/SFSymbol.png';

export default withRouter((props)=>{
        const dontShow = ['/'];
        console.log('Header Props:', props);

        if(dontShow.includes(props.location.pathname)) return null;

        return(
            
                <nav className="uni-header">
                    <img src={bookBirdLogo} alt={"birdlogo"} className="birdLogo"/>
                    <img src={bookBirdText} alt={"birdlogotext"} className="birdLogoText"/>
                    <img src={sfSymbol} alt={"sfSymbol"} className="sfSymbol"/>
                </nav>
    );
    
});
