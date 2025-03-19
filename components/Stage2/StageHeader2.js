import React from "react";
import Speak from "../Speak";
import Volume from "../Volume";

const StageHeader2 = ({ title, name }) => {
    return (
        <div style={{
            background: "#0070D9",
            height: "50px",
            width: "100%",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            display: "flex",
        }}>
            <div style={{
                width: "20%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                display: "flex",
            }}>
                <Speak name={name} />
            </div>
            <div style={{
                width: "60%",
                height: "100%",
                justifyContent: "center",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                display: "flex",
                fontFamily: "Inter, sans-serif",
            }}>
                <p style={{color: '#FFF6C8', fontSize: '25px', fontWeight: 'bold'}} >{title}</p>
            </div>
            <div style={{
                width: "20%",
                height: "100%",
                justifyContent: "center",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                display: "flex",
            }}>
                <Volume name={name} isLabel={false} />
            </div>
        </div>
    );
}

export default StageHeader2;