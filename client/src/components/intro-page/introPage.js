import React from 'react'
import {Link} from 'react-router-dom';
import './introPage.css'
import bookBirdLogo from './images/introPageLogo.png'

export default ()=> {
    return(
        <div className="row introPageContainer">
            <div className="col s12 l12 m12  center-align logoImgContainer">
                <img src={bookBirdLogo} className="introPageLogoImg"alt=""/>
            </div>
            <div className="col l12 m12 s12 center-align introPageButtonContainer">
                <Link to={"/Landing"}><p className="btn-large btn waves-effect blue lighten-3 "> Get Started </p> </Link>
            </div>
        </div>
    )

}



