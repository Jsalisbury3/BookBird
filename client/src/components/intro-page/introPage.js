import React from 'react'
import {Link} from 'react-router-dom';
import './introPage.css'
import bookBirdLogo from './images/introPageLogo.png'




export default ()=> {
    return(
        <div className="row introPageContainer">
            <div className='hide-on-med-and-down'>
                <h1 className="intro-title">BookBird</h1>
            </div>
            <div className=' app-tutorial-video hide-on-med-and-down'>
            <iframe className="app-video" width="560" height='315' src="http://www.youtube.com/embed/9FkQEOjgLI0?autoplay=1&controls=0&loop=1&playlist=8HSr8BjcufM&amp;showinfo=0" loop="true"></iframe>
            </div>
            <div className="col s12  m12 hide-on-large-only   center-align logoImgContainer">
                <img src={bookBirdLogo} className="introPageLogoImg"alt=""/>
            </div>
            <div id='introPageButton' className="col  m12 s12 center-align introPageButtonContainer">
                <Link to={"/Landing"}><p className="btn-large btn waves-effect blue lighten-3 "> Get Started </p> </Link>
            </div>



        </div>
    )

}



