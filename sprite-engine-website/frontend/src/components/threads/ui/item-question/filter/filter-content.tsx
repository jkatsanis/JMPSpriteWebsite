import React, { useState } from 'react';
import { LabelColors } from 'components/threads/logic/model';
import { filterRepo } from 'components/threads/logic/filter-repository';
import LabelRenderer from './label/labels-renderer';

import "./filter-content.css";

interface FilterContentProps {
    updateFilter: () => void;
}

export const FilterContent: React.FC<FilterContentProps> = ({updateFilter}) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>();
    const [selectedItems, setSelectedItems] = useState<string[]>(filterRepo.labels);
    const [authorInputValue, setAuthorInputValue] = useState<string>(filterRepo.account);

    const labelsList: string[] = Object.keys(LabelColors);

    const onFilterChange = () => {
        updateFilter();
    }

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        if (newValue && !selectedItems.includes(newValue)) {
            setSelectedItems([...selectedItems, newValue]);
            filterRepo.labels.push(newValue);

            onFilterChange();
        }
        setSelectedValue("");
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
                <select
                    className='label-selector'
                    id="selectionList"
                    name="selectionList"
                    value={selectedValue}
                    onChange={handleSelectionChange}
                >
                    <option value="">Add</option>
                    {labelsList.map((label, index) => (
                        <option key={index} value={label}>{label}</option>
                    ))}
                </select>
            </div>
            <div>
                <LabelRenderer selectedItems={selectedItems}/>
            </div>
            <button className='default-btn' style={{ marginLeft: '8.5rem', fontSize: '0.8rem' }} onClick={handleReset}>Reset</button>
        </div>
    );
};
