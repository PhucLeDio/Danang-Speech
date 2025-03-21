import React from "react";
import Label from "../Label";
import Volume from "../Volume";

const StageHeader = ({isList, name }) => {
    return (
        isList == true ? (
            <div style={{ width: '515px', height: '90px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', gap: '10px' }}>
            <p style={{
                width: '280px',
                textAlign: 'center',
                fontSize: '27px',
                fontWeight: 'bold',
                color: '#0070D9',
            }}>Danh sách từ đã lưu</p>
            <Volume isList={true} name={name} isLabel={true} />
        </div>
        ) : (
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
            <Volume isList={false} name={name} isLabel={true} />
        </div>
        )
    );
}

export default StageHeader;