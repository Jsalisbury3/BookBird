import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Logo from './images/IntroPageLogo.png';
import {LinkTracker}from "../../actions/linkTracker_action"

class SideNav extends Component {

    state = {
        location: '',
        common: [
            {
                text: "Home",
                to: "/"
            },
            {
                text: "Search",
                to: "/Landing"
            },
            {
                text: "Add Book",
                to: "/AddBook"
            },
            {
                text: "Team",
                to: "/MeetTheTeam"
            }
        ],
        Auth: [
            {
                text: "Profile",
                to: "/UserProfile"
            },
        ],
        noAuth: [
            {
                text: "Sign In",
                to: "/signIn"
            },
            {
                text: "Sign Up",
                to: "/signUp"
            }
        ],
        links: '',
    };

    buildLinkForNav = (link) => {
        let to = link.to;
        let wantedClass = to.slice(1, link.to.length);
        localStorage.setItem("currentLink", window.location.pathname.slice(1, link.to.length));
        if(this.props.currentLink) {
            return (
                <li onClick={this.changeState} key={link.to}>
                    <Link className={`${this.props.currentLink.slice(1, link.to.length) === wantedClass ? "highlight" : ""}`} to={link.to}>{link.text}</Link>
                </li>
            )
        } else {
            return (
                <li onClick={this.changeState} key={link.to}>
                    <Link className={`${localStorage.getItem("currentLink") === wantedClass ? "highlight" : ""}`} to={link.to}>{link.text}</Link>
                </li>
            )
        }

    };

    componentDidMount = () => {
        this.setState({
            location: this.props.location.pathname
        })
    };

    handleSignOut = () => {
        localStorage.clear();
        this.props.history.push("/SignIn");
        this.getLinksInMenu();
    };

    getLinksInMenu = () => {
        const {common, Auth, noAuth} = this.state;
        let token = localStorage.getItem("Token");
        let links = [...common];
        if (token) {
            links = [...common, ...Auth].map(this.buildLinkForNav);
            links.push(
                <li key={"sign-out"} className={"sign-out center"}>
                    <button onClick={this.handleSignOut} className={"btn blue"}>Sign Out</button>
                </li>
            )
        } else {
            links = [...common, ...noAuth].map(this.buildLinkForNav)
        }
        return links
    };

    changeState = async (e) => {
        let path = window.location.pathname;
        console.log(path);
        await this.props.LinkTracker(path);
    }

    render() {
        const dontShow = ['/'];
        let currentLink = this.props.currentLink ? this.props.currentLink : window.location.pathname;
        console.log("currentLink variable: ", currentLink);
        if (dontShow.includes(currentLink)) return null;
        console.log(this.state.location);
        const links = this.getLinksInMenu();
        return (
            <div className="navigation col hide-on-small-only m2 ">
                <img className="navDesktopLogo" src={Logo}/>
                <div className="sideNavLinks">
                    <ul>
                        <ul ref={(element) => {
                            this.navRef = element
                        }}>
                            {links}
                        </ul>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        token: localStorage.getItem("Token"),
        currentLink: state.link_tracker_reducer.currentLink
    }
}

export default connect(mapStateToProps, {
    LinkTracker
})(withRouter(SideNav));

// import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import { withRouter } from 'react-router-dom';
// import Logo from './images/IntroPageLogo.png';
//
//
// export default withRouter((props)=>{
//     const dontShow = ['/'];
//     if(dontShow.includes(props.location.pathname)) return null;
//
//     return(
//         <div className="navigation col hide-on-small-only m2 ">
//             <img className="navDesktopLogo" src={Logo}/>
//             <div className="sideNavLinks">
//                 <ul>
//                     <li>
//                         <Link to={"/"}>
//                             Home
//                         </Link>
//
//                     </li>
//                     <li>
//                         <Link to={"/Landing"}>
//                         Search
//                         </Link>
//
//                     </li>
//                     <li>
//                         <Link to={"/AddBook"}>
//                             Add Book
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to={"/SignIn"}>
//                             Sign In
//                         </Link>
//                     </li>
//                     <li>
//                         <Link to={"/"}>
//                             Meet the Team
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//
//         </div>
//     )
// })

