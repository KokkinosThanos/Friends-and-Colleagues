import React from "react";
import './FormSubmit.css';

const FormSubmit = (props) => {
    return(
        <div className="form-submit">
            <div className="submit-button">
                        {props.children}
            </div>
        </div>
    )
}

export default FormSubmit;