import React from "react";
import '../App.css'
function Citycards(props) {

    const myStyle = {
        backgroundImage:
            `url(${props.details.backgroundimage})`,
    };
    return (
        <>
            <div className="citycard" style={myStyle}>
                {props.details.city}
            </div>
        </>
    );
}

export default Citycards;