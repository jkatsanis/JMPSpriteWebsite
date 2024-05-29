// src/Contributors.js
import { Component } from 'react';
import { Account } from '../../logic/model';
import "./contributers.css"

interface ContributorsRendererProps
{
    contributers: Account[];
}

class ContributorsRenderer extends Component<ContributorsRendererProps> {

    render() {
        const contributers:Account[] = this.props.contributers;

        return (
            <div>
                <div className='contributer-box'>
                    <h6>Contributers to this page</h6>
                    { contributers && contributers.map((contributer, idx) => (
                        <p>{contributer.name}</p>
                    )) }
                </div>
            </div>
        );
    }
}

export default ContributorsRenderer;
