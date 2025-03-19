import React from "react";
import Label from "../Label";
import Volume from "../Volume";

const StageHeader = ({ name }) => {
    return (
        <div style={{ width: '515px', height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', gap: '10px' }}>
            <Label
                width={"280px"}
                textAlign={"center"}
                text={name}
                height={"75px"}
                fontSize={"45px"}
                alignContent={"center"}
                color={"#0070D9"}
            />
            <Volume name={name} isLabel={true} />
        </div>
    );
}

export default StageHeader;