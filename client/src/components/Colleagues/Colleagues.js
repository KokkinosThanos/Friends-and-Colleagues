import React from "react";

import AddColleagues from "./Presentation/AddColleagues";
import ViewColleauges from "./Presentation/ViewColleagues";

import './Colleagues.css';

const Colleagues = () => {
    return(
        <div className="colleagues-field">
            <AddColleagues />
            <ViewColleauges />
        </div>
    )
}

export default Colleagues;