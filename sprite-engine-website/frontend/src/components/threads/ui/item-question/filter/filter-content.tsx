import React, { useState } from 'react';
import { filterRepo } from 'components/threads/logic/filter-repository';
import LabelRenderer from './label/labels-renderer';
import { LabelAdder } from './label/label-adder';

interface FilterContentProps {
    updateFilter: () => void;
}

export const FilterContent: React.FC<FilterContentProps> = ({updateFilter}) => {
    const [selectedItems, setSelectedItems] = useState<string[]>(filterRepo.labels);
    const [authorInputValue, setAuthorInputValue] = useState<string>(filterRepo.account);

    const onFilterChange = () => {
        updateFilter();
    }

    const handleSelectionChange = (label: string) => {
        setSelectedItems([...selectedItems, label]);
        onFilterChange();
        filterRepo.labels.push(label);
    };

    const setAuthorInput = (ac: string) => {
        setAuthorInputValue(ac);
        filterRepo.account = ac;
        onFilterChange();
    }

    const handleReset = () => {
        setSelectedItems([]); // Reset selected labels
        setAuthorInputValue(""); // Reset author input value
        onFilterChange();
        filterRepo.reset();
    };

    return (
        <div>
            <div className='inline'>
                <p>Author: </p>
                <input
                    type="text"
                    id="authorInput"
                    name="authorInput"
                    value={authorInputValue}
                    onChange={(event) => setAuthorInput(event.target.value)}
                />
            </div>
            <div className='inline'>
                <p>Labels: </p>
                <LabelAdder onChange={handleSelectionChange}/>
            </div>
            <div>
                <LabelRenderer selectedItems={selectedItems}/>
            </div>
            <button className='default-btn' style={{ marginLeft: '8.5rem', fontSize: '0.8rem' }} onClick={handleReset}>Reset</button>
        </div>
    );
};
