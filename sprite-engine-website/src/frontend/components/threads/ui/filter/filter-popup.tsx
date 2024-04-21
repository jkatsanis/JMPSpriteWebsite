import React from 'react';

interface FilterPopupProps {
  onCloseClick: () => void;
}

export const FilterPopup: React.FC<FilterPopupProps> = ({ onCloseClick }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '3rem',
        left: 0,
        backgroundColor: '#333333',
        padding: '1rem',
        zIndex: 9999, // Ensure the popup is above other elements
        width: '12rem',
      }}
    >
      {/* Popup content */}
      <button style={{ left: '10rem', position: 'absolute' }} onClick={onCloseClick}>
        X
      </button>
      <p>UGAAAAAAAAA</p>
    </div>
  );
};
