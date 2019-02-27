import React, {Component} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom';
import './introPage.css'
import bookBirdLogo from './images/introPageLogo.png'
import {LinkTracker} from "../../actions/linkTracker_action"

class IntroPage extends Component {
    addLinkToReducer = async () => {
        const path = "/Landing";
        await this.props.LinkTracker(path);
    }
    render() {
        return (
            <div className="row introPageContainer">
            <div className=' col s12 m12 offset-6 offset-6 hide-on-small-only'>
                <h1 className="intro-title center">BookBird</h1>
            </div>
            <div className=' col l12 m12 s12 center app-tutorial-video hide-on-small-only'>
            <iframe className="app-video center" width="560" height='315' src="http://www.youtube.com/embed/9FkQEOjgLI0?autoplay=1&controls=0&loop=1&playlist=8HSr8BjcufM&amp;showinfo=0" loop="true"></iframe>
            </div>
            <div className="col l12 m12 s12 center  hide-on-med-and-up logoImgContainer">
                <img src={bookBirdLogo} className="introPageLogoImg"alt=""/>
            </div>
            <div id='introPageButtonContainer' className="col l12 m12 s12  introPageButtonContainer center">
                    <Link onClick={this.addLinkToReducer} to={"/Landing"}><p
                        className=" introPageButton btn-large btn waves-effect blue lighten-3 "> Get Started </p></Link>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
export default connect(mapStateToProps, {
    LinkTracker
})(IntroPage);


