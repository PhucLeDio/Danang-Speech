import React from "react";
import LOGO from "../assets/images/LOGO.png";

const Header = () => {
    return (
        <div style={{width: '100%', height: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px', backgroundColor: '#FFFFFF'}}>
            <div>
                <p style={{color: '#0F52B5', fontWeight: 'bold'}}>Plugin Danang NLP</p>
            </div>
            <div>
                <img src={LOGO} alt="Logo" style={{height: '50px'}}/>
            </div>
        </div>
    );
}

export default Header;
