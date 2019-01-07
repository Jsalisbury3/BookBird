import React from 'react';
import './addBook.css';

export default props => {
    console.log("SBP props:",props);
    const {about,index} = props;

    return (
    <div  className="single-photo-container">
        <img onClick={props.delete} src={URL.createObjectURL(about)}/>
    </div>
    );
}
