import React from 'react';
import IconText from 'frontend/components/icontext';
import { BigDocu } from '../util/doc';

import 'frontend/utils/general.css';

export default class EditorDocs extends React.Component {

    render() {
        return (
               <details id="editor">
                    <summary>The Editor</summary>
                    <br />
                    <hr />
                    <br />

                    <BigDocu title='Hierarchy'>
                        <IconText iconPath="ressources/icons/important.svg" text="If you have selected a sprite, its color in the Hierarchy window will be blue." />
                        <IconText iconPath="ressources/icons/important.svg" text="If you hovered over a sprite, its background color will be white-grey." />
                    </BigDocu>

                    <BigDocu title='Create'>
                        <div>
                            All the sprites your scene has will be displayed in the editor. You can click on a sprite to
                            select and edit it. You can learn more <a href="#inspector">here</a>.<br />
                            To create a new sprite, right-click in the hierarchy window.
                        </div>
                        <img src="ressources/pictures/hierarchy-popup.PNG" alt="Hierarchy Popup" />
                        <div>
                            A popup will appear; hover over the create button and click on the "Sprite" menu item.<br />
                            A Sprite will spawn in the hierarchy window and in the game window. You can set the spawn position to the camera center, 
                            it spawns by default at coordinates (0/0).
                        </div>
                        <br/>
                    </BigDocu>
                
                    <BigDocu title='Delete'>
                        <div>
                            You can right-click on the sprite and hit the delete button to remove it.<br />
                            If there is a grey-white background, the engine recognizes that you are hovering over the sprite,
                            and hitting the "delete" menu item will delete it, along with all its children.
                        </div>
                        <img src="ressources/pictures/hierarchy-popup-delete.PNG" alt="Hierarchy Popup Delete" />
                    </BigDocu>

                    <BigDocu title='Children & Parent'>
                        <div>
                            If you hold left-click on a sprite (menu item) for 0.3 seconds, it will be selected as a potential child.<br />
                            If you have selected a sprite with this method and hover over any other sprite, then release the left-click,
                            you can make it a child of this parent.<br />
                            It should look like this:
                        </div>
                        <div>
                            <IconText iconPath="ressources/icons/important.svg" text="If you delete a child, it will not delete the parent" />
                            <IconText iconPath="ressources/icons/important.svg" text="Deleting a parent will delete all its children." />
                        </div>
                        <img src="ressources/pictures/hierarchy-parent-child.PNG" alt="Hierarchy Parent Child" />
                    </BigDocu>

                    <BigDocu title='Inspector'>
                        <div>Oga</div>
                        <br/>
                    </BigDocu>
                </details> 
        );
    }
}
