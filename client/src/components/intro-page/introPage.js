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
                <div className="col s12 l12 m12  center-align logoImgContainer">
                    <img src={bookBirdLogo} className="introPageLogoImg" alt=""/>
                </div>
                <div className="col l12 m12 s12 center-align introPageButtonContainer">
                    <Link onClick={this.addLinkToReducer} to={"/Landing"}><p
                        className="btn-large btn waves-effect blue lighten-3 "> Get Started </p></Link>
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


