import React from 'react';
import LikeWindow from 'components/likewindow/likewindow';

import { handleClickEditor } from './engine/docs-editor'; // This is the click when pressing the editor frame

const NavigationFrame: React.FC = () => {
  return (
    <div>
        <div className='h-3'/>
        <div className="like-windows-container">
            <LikeWindow
                imageSrc="ressources/pictures/editor.png"
                title="The editor"
                description="Delve into our 2D C++ engine and kickstart your game development journey with our easy guide and start creating your first game!"
                lin={null} 
                onClickCallback={handleClickEditor}/>
            <LikeWindow
                imageSrc="ressources/pictures/components.png"
                title="Components"
                description="Explore the key components of our 2D C++ engine and ignite your creativity in game design!"
                lin={null}
                onClickCallback={null} />
            <LikeWindow
                imageSrc="ressources/pictures/namespace.png"
                title="Namespace (spe::)"
                description="Experience the efficiency of our spe:: namespace and simplify your game development process with ease!"
                lin={null} 
                onClickCallback={null}/>
        </div>
        <div className='h-3'/>
    </div>
  );
}

export default NavigationFrame;
