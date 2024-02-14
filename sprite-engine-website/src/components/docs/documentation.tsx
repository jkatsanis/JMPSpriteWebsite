import React from 'react';
import Syntax from "./syntax";
import Doc from './doc';
import Bottom from 'components/bottom/bottom';

import './documentation.css';
import "utils/general.css";

interface DocuProps {

}



export default class Docu extends React.Component<DocuProps> {

    render() {
        const codeSnippet = 
`#include <iostream>
using namespace std;
        
class MyClass {
public:
    void myMethod() {
        cout << "This is my method." << endl;
    }
};`;
        
        return (
            <div>
                <div className='centered-div'>
                    <div>
                        <h1>Welcome to the Documentation Page</h1>
                        <p>
                            This is a simple documentation page for the SpriteEngine project.
                            Here, you can find various guides and references to help you understand and use SpriteEngine.
                        </p>                        
                        <details>
                            <summary>The editor</summary>
                            <div className="content-in-details">
                                <div className="space-2rem"></div>
                                <hr />
                                <ul>
                                    <li>Hierarchy</li>
                                    <li>Toolbar</li>
                                    <li>Content browser</li>
                                    <li>Inspector</li>
                                    <li>Scale tool</li>
                                </ul>
                                <div className="space-2rem"></div>
                                <h3>Hierarchy</h3>
                                <hr />
                                <p>
                                    If you have selected a sprite the color of it in the Hierarchy window will be blue!<br />
                                    If you have hovered a sprite the background color of it will be white-grey!
                                </p>
                                <h5>Create</h5>
                                <p>
                                    All the sprites your scene has will display in the editor. You can click on a sprite
                                    to select and edit it. You can learn more <a href="#inspector">here</a>
                                    <br />
                                    To create a new sprite right click in the hierarchy window
                                </p>
                                <img src="pictures/hierarchy-popup.PNG" alt="Hierarchy Popup" />
                                <p>
                                    A popup will pop up, hover over the create button and click on the
                                    "Sprite" menu item
                                    <br />
                                    A Sprite will spawn in the hierarchy window.
                                </p>
                                <h4>Delete</h4>
                                <p>
                                    You can right click on the sprite and hit the delete button
                                    to delete it.
                                    <br />
                                    If there is a grey-white background, the engine knows you are hovering
                                    the sprite, and if you hit the "delete" menu item it will get deleted. Including all its children.
                                </p>
                                <img src="pictures/hierarchy-popup-delete.PNG" alt="Hierarchy Popup Delete" />
                                <div className="space-1rem"></div>
                                <h5>Childs</h5>
                                <p>
                                    If you hold left click on a sprite (menu item) 0.3 second it will get
                                    selected as sprite which potentially can be a child. <br />
                                    If you have selected a sprite with this method and hover over any other sprite and release left click
                                    you can make it a child of this parent. <br />
                                    It should look like this:
                                </p>
                                <p>Important note: If you delete a child it will not delete the parent. <br />
                                    It will delete (free) all the childs if you delete a parent
                                </p>
                                <img src="pictures/hierarchy-parent-child.PNG" alt="Hierarchy Parent Child" />
                                <div className="space-2rem"></div>
                                <h3 id="inspector">Inspector</h3>
                                <hr />
                            </div>
                        </details>

                        <Doc description='uga'>
                            Here is some content
                        </Doc>       
                    </div> 
                </div>
                <Bottom/>
            </div>
        );
    }
}
