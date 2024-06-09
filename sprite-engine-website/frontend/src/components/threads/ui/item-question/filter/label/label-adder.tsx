import React, { useState } from 'react';
import { LabelColors } from 'components/threads/logic/model';
import './label-adder.css'

interface LabelSelectorProps {
    onChange: (label: string) => void;
    presentItems: string[];
}

export const LabelAdder: React.FC<LabelSelectorProps> = (props) => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>();
    const [selectedItems, setSelectedItems] = useState<string[]>(props.presentItems);
    const [render, reRender] = useState(false);

    const labelsList: string[] = Object.keys(LabelColors);
    
    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        if (newValue && !selectedItems.includes(newValue)) {
            setSelectedItems([...selectedItems, newValue]);
            props.onChange(newValue);
            reRender(!render);
        }
        setSelectedValue("");
    };
    return (
        <div className='inline'>
            <select
                className='label-selector'
                id="selectionList"
                name="selectionList"
                value={selectedValue}
                onChange={handleSelectionChange}
            >
                <option value="">Labels: </option>
                {labelsList.map((label, index) => (
                    <option key={index} value={label}>{label}</option>
                ))}
            </select>
        </div>
      );
};
