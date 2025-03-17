import React from "react";

const Example = ({textType, TuNgu, ViDu}) => {
    return (
        <div style={{ height: '145px', width: '135px', borderRadius: '10px', boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", }}>
            <div style={{ height: '25%', backgroundColor: '#0070D9', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', textAlign: 'center', alignContent: 'center' }}>
                <p style={{ color: '#FFF6C8', fontWeight: 'bold' }}>{textType}</p>
            </div>
            <div style={{ height: '60%', padding: '10px', backgroundColor: '#FFF6C8', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <div style={{ fontWeight: 'bold', color: '#FFDB5A' }}>
                </div>
                <div style={{ paddingLeft: '10px', fontWeight: 'bold', color: '#303746' }}>
                    &middot; {TuNgu ? TuNgu: 'Không có'}
                </div>

                {/* <div style={{ paddingTop: '5px', fontWeight: 'bold', color: '#FFDB5A' }}>
                    + Ví dụ :
                </div>
                <div style={{ paddingLeft: '10px', fontWeight: 'bold', color: '#FFFFFF' }}>
                    &middot; {ViDu ? ViDu : 'Không có'}
                </div> */}
            </div>
        </div>
    );
}

export default Example