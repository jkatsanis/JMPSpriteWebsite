import React, { useState } from 'react';
import { FilterPopup } from './filter-popup';


interface FilterComponentProps {
  updateFilter: () => void;
}

export const FilterQuestionButton: React.FC<FilterComponentProps> = ({ updateFilter }) => {
  // State to manage the visibility of the popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to handle button click and toggle popup visibility
  const onClick = () => {
    setIsPopupOpen(!isPopupOpen);
    updateFilter();
  };
  

  return (
    <>
      <button
        style={{ whiteSpace: 'nowrap', marginLeft: '2rem', padding: '0.5rem 1rem' }}
        onClick={onClick}
		className='default-btn'
      >
        Filter
      </button>
      {isPopupOpen && (
	  	<FilterPopup updateFilter={updateFilter}/>
      )}
    </>
  );
};

export default FilterQuestionButton;
