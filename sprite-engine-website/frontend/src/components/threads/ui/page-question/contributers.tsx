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

        let contributersString = "";

        for (let i = 0; i < contributers.length; i++) {
            contributersString += contributers[i].name;
            if (i < contributers.length - 1) {
                contributersString += ", ";
            }
        }

        return (
            <div>
                <div className='contributer-box'>
                    <h6>Contributers to this page</h6>
                    <p>{contributersString}</p>
                </div>
            </div>
        );
    }
}

export default ContributorsRenderer;
