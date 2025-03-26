import React from 'react';
import '../components/style/Switch.css';
import "../style.css"

const SwitchField = ({ label, checked, onChange }) => {
  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <div style={{ padding: '10px', fontSize: '1.2em', border: '1px solid #ccc', borderRadius: '5px', width: '100%', backgroundColor: '#FFFFFF', color: 'black' }}>
        {label}
      </div>
      <div className="switch-container" onClick={onChange}>
        <label className="switch">
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default SwitchField;
