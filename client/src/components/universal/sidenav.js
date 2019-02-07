import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Logo from './images/IntroPageLogo.png';

class SideNav extends Component {
    state = {
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
        return (
            <li key={link.to}>
                <Link to={link.to}>{link.text}</Link>
            </li>
        )
    };

    handleSignOut = () => {
        localStorage.clear();
        this.props.history.push("/SignIn");
        this.getLinksInMenu();
    };

    componentDidMount = () => {
        const dontShow = ['/'];
        if(dontShow.includes(this.props.location.pathname)) return null;
    }

    componentDidUpdate = () => {
        const dontShow = ['/'];
        if(dontShow.includes(this.props.location.pathname)) return null;
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

    render() {

        const links = this.getLinksInMenu();
        return (
            <Fragment>
                <div className="navigation col hide-on-small-only m2 ">
                    <img className="navDesktopLogo" src={Logo}/>
                    <div className="sideNavLinks">
                        <ul>
                            <ul ref={(element) => {this.navRef = element}}>
                                {links}
                            </ul>
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        token : localStorage.getItem("Token")
    }
}

export default connect(mapStateToProps, {})(withRouter(SideNav));

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

