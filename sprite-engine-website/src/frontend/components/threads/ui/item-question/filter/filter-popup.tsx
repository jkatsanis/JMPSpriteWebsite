import React from 'react';
import { FilterContent } from './filter-content';

interface FilterPopupProps {
  updateFilter: () => void;
}

export const FilterPopup: React.FC<FilterPopupProps> = ({ updateFilter }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '3rem',
        left: 0,
        backgroundColor: '#333333',
        padding: '1rem',
        zIndex: 9999, // Ensure the popup is above other elements
        width: '15rem',
        borderRadius: '7px'
      }}
    >
      {/* Popup content 
      <button style={{ left: '10rem', position: 'absolute' }} onClick={onCloseClick}>
        X
      </button>*/}
      <FilterContent updateFilter={updateFilter}/>
    </div>
  );
};
