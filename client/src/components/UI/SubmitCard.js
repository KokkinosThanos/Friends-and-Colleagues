import React from "react";
import './SubmitCard.css';

const SubmitCard = (props) => {
    return(
        <div className="submit-card">
            {props.children}
        </div>
    )
} 

export default SubmitCard;