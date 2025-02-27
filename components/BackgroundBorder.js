import React from "react";

const BackgroundBorder = ({ children }) => {
    return (
        <div style={{ height: '500px', width: '600px', position: 'relative'}}>
            {children}
        </div>
    );
}

export default BackgroundBorder;
