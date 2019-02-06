import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Logo from './images/IntroPageLogo.png';


export default withRouter((props)=>{
    const dontShow = ['/'];
    if(dontShow.includes(props.location.pathname)) return null;

    return(
        <div className="navigation col hide-on-small-only m2 ">
            <img className="navDesktopLogo" src={Logo}/>
            <div className="sideNavLinks">
                <ul>
                    <li>
                        <Link to={"/Landing"}>
                        Search
                        </Link>
                        
                    </li>
                    <li>
                        <Link to={"/AddBook"}>
                            Add Book
                        </Link>
                    </li>
                    <li>
                        <Link to={"/SignIn"}>
                            Sign In
                        </Link>
                </li>
                </ul>
            </div>

        </div>
    )
})

