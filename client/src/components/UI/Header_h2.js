import React from "react";
import './Header_h2.css';

const Header_h2 = (props) => {
    return(
        <h2 className={` header-h2 ${props.className} `}> {props.children} </h2>
    )
}

export default Header_h2;