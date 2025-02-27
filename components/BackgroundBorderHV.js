import React from "react";

const BackgroundBorderHV = ({ children }) => {
    return (
        <div style={{ height: '320px', width: '600px', position: 'relative'}}>
            {children}
        </div>
    );
}

export default BackgroundBorderHV;
