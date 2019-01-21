import React from 'react'
import {Link} from 'react-router-dom';
import './introPage.css'
import bookBirdLogo from './images/introPageLogo.png'

export default ()=> {
    return(
        <div className="introPageContainer">
            <div className="logoImgContainer">
                <img src={bookBirdLogo} className="introPageLogoImg"alt=""/>
            </div>
            <div className="introPageButtonContainer">
                <Link to={"/Landing"}><p className="btn-large btn waves-effect blue lighten-3 "> Get Started </p> </Link>
            </div>
        </div>
    )

}



