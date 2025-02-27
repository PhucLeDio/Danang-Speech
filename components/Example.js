import React from "react";

const Example = ({textType, TuNgu, ViDu}) => {
    return (
        <div style={{ height: '145px', width: '135px', borderRadius: '10px' }}>
            <div style={{ height: '25%', backgroundColor: '#FFDB5A', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', textAlign: 'center', alignContent: 'center' }}>
                <p style={{ color: '#A83D00', fontWeight: 'bold' }}>{textType}</p>
            </div>
            <div style={{ height: '60%', padding: '10px', backgroundColor: '#0083E1', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <div style={{ fontWeight: 'bold', color: '#FFDB5A' }}>
                </div>
                <div style={{ paddingLeft: '10px', fontWeight: 'bold', color: '#FFFFFF' }}>
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