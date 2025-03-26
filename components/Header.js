import React from "react";
import LOGO from "./images/LOGO.png";
import "../style.css"

const Header = ({boxShadow}) => {
    return (
        <div style={{ 
            width: "100%", 
            height: "50px", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            padding: "0 5px",
            backgroundColor: "#FFFFFF",
            boxShadow: boxShadow // Added box-shadow at the bottom
        }}>
            <div>
                <p style={{ color: "#0F52B5", fontWeight: "bold", fontSize: 16 }}>Vietnamese Dictionary</p>
            </div>
            <div>
                <img src={LOGO} alt="Logo" style={{ height: "50px" }} />
            </div>
        </div>
    );
};

export default Header;
