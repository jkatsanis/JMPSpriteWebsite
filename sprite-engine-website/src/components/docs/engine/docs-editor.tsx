import React from 'react';
import IconText from 'components/icontext';
import { BigDocu } from '../doc';

import './docs-editor.css';
import 'utils/general.css';

const EditorDocs: React.FC = () => {
    return (
        <details id="editor">
            <summary>The Editor</summary>
            <br />
            <hr />
            <br />

            <BigDocu title='Hierarchy'>
                <p>
                    <IconText iconPath="ressources/icons/important.svg" text="If you have selected a sprite, its color in the Hierarchy window will be blue." />
                    <IconText iconPath="ressources/icons/important.svg" text="If you hovered over a sprite, its background color will be white-grey." />
                </p>
            </BigDocu>

            <BigDocu title='Create'>
                <p>
                    All the sprites your scene has will be displayed in the editor. You can click on a sprite to
                    select and edit it. You can learn more <a href="#inspector">here</a>.<br />
                    To create a new sprite, right-click in the hierarchy window.
                </p>
                <img src="ressources/pictures/hierarchy-popup.PNG" alt="Hierarchy Popup" />
                <p>
                    A popup will appear; hover over the create button and click on the "Sprite" menu item.<br />
                    A Sprite will spawn in the hierarchy window and in the game window. You can set the spawn position to the camera center, 
                    it spawns by default at coordinates (0/0).
                </p>
            </BigDocu>

            <BigDocu title='Delete'>
                <p>
                    <p>
                        You can right-click on the sprite and hit the delete button to remove it.<br />
                        If there is a grey-white background, the engine recognizes that you are hovering over the sprite,
                        and hitting the "delete" menu item will delete it, along with all its children.
                    </p>
                    <img src="ressources/pictures/hierarchy-popup-delete.PNG" alt="Hierarchy Popup Delete" />
                </p>
            </BigDocu>

            <BigDocu title='Children & Parent'>
                <p>
                    <p>
                        If you hold left-click on a sprite (menu item) for 0.3 seconds, it will be selected as a potential child.<br />
                        If you have selected a sprite with this method and hover over any other sprite, then release the left-click,
                        you can make it a child of this parent.<br />
                        It should look like this:
                    </p>
                    <p>
                        <IconText iconPath="ressources/icons/important.svg" text="If you delete a child, it will not delete the parent" />
                        <IconText iconPath="ressources/icons/important.svg" text="Deleting a parent will delete all its children." />
                    </p>
                    <img src="ressources/pictures/hierarchy-parent-child.PNG" alt="Hierarchy Parent Child" />
                </p>
            </BigDocu>

            <BigDocu title='Inspector'>
                <p>Oga</p>
                <br/>
            </BigDocu>
        </details>
    );
}

export default EditorDocs;