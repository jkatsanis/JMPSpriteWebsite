import React from 'react';
import './docu.css';

interface DocuProps
{

}

export default class Docu extends React.Component<DocuProps>
{
    render()
    {
        return(
            <div className="mainBack">
                <h1>Welcome to the Documentation Page</h1>
                <p>Hello, I am new. This is a simple documentation page for the SpriteEngine project.</p>
                <p>Here, you can find various guides and references to help you understand and use SpriteEngine.</p>
            </div>
        );
    }
}
