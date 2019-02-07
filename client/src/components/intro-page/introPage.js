import React from 'react'
import {Link} from 'react-router-dom';
import './introPage.css'
import bookBirdLogo from './images/introPageLogo.png'
import iphonePhoto from './images/iphone-6-frame-png-7 (1).png';



export default ()=> {
    return(
        <div className="row introPageContainer">
            <div className="col s12 l12 m12  center-align logoImgContainer">
                <img src={bookBirdLogo} className="introPageLogoImg"alt=""/>
            </div>
            <div className="col l12 m12 s12 center-align introPageButtonContainer">
                <Link to={"/Landing"}><p className="btn-large btn waves-effect blue lighten-3 "> Get Started </p> </Link>
            </div>
            {/*<div className='iphoneImgContainer'>*/}
                {/*<img src={iphonePhoto} className='iphonePhotoImg' alt='iphone photo'/>*/}
            {/*</div>*/}
            <div className='photoContainer'>
                <video className='video' loop autoPlay>
                    <source src="tutorialVideo.mp4" type="video/mp4"/>
                </video>
            </div>

            {/*<video width="320" height="240" controls>*/}
                {/*<source src="BookBirdTurotial.mp4" type="video/mp4"/>*/}
            {/*</video>*/}

            {/*<video src='BookBirdTurotial.mp4'/>*/}
            {/*<div>*/}
                {/*<video className='videoTag'>*/}
                    {/*<source src={tutorialVideo} type='video/mp4'/>*/}
                {/*</video>*/}
            {/*</div>*/}

        </div>
    )

}



