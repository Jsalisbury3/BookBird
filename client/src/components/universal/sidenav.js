import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


export default withRouter((props)=>{
    const dontShow = ['/'];
    if(dontShow.includes(props.location.pathname)) return null;

    return(
        <div className="navigation col hide-on-small-only m2 ">

        </div>
    )
})

