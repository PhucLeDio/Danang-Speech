// src/Button.js
import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button
      style={{
        width: '150px',
        padding: '10px',
        fontSize: '1.1em',
        color: '#FFFFFF',
        backgroundColor: '#0F52BA',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
