import React from "react";
import './FormInputs.css';

const FormInputs = (props) => {
    return(
        <div className="form-inputs">
            {props.children}
        </div>
    )
}

export default FormInputs;