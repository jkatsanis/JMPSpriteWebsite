import React from 'react';
import { LabelColors } from 'components/threads/logic/model';

import './label-renderer.css'

interface Props {
    selectedItems: string[];
}

const LabelRenderer: React.FC<Props> = ({ selectedItems }) => {
    return (
        <div className='inline'>
            {selectedItems.map((item, index) => (
                <p key={index} className='label-item' style={{ backgroundColor: LabelColors[item] }}>{item}</p>
            ))}
        </div>
    );
};

export default LabelRenderer;
