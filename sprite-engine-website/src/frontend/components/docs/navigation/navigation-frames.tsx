import React from 'react';
import LikeWindow from 'frontend/components/likewindow/likewindow';

export const handleClickNavigationFrame = (item: string, count: number) => {
    const openParentDetails = (element: HTMLElement | null) => {
        while (element && element.tagName !== 'DETAILS') {
            element = element.parentElement;
        }
    
        if (element) {
            (element as HTMLDetailsElement).open = true;
            openParentDetails(element.parentElement);
        }
    };
    
    const detailsSection = document.getElementById(item);
    
    if (detailsSection) {
        detailsSection.scrollIntoView({ behavior: 'smooth' });
        openParentDetails(detailsSection.parentElement);
        detailsSection.setAttribute("open", "true");
    }
    if(count < 2)
    {
        count++;
        handleClickNavigationFrame(item, count);
    }
};

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
                onClickCallback={() => handleClickNavigationFrame("editor", 0)}/>
            <LikeWindow
                imageSrc="ressources/pictures/components.png"
                title="Components"
                description="Explore the key components of our 2D C++ engine and ignite your creativity in game design!"
                lin={null}
                onClickCallback={() => handleClickNavigationFrame("components", 0)}/>
            <LikeWindow
                imageSrc="ressources/pictures/namespace.png"
                title="Namespace (spe::)"
                description="Experience the efficiency of our spe:: namespace and simplify your game development process with ease!"
                lin={null} 
                onClickCallback={() => handleClickNavigationFrame("spe", 0)}/>
        </div>
        <div className='h-3'/>
    </div>
  );
}

export default NavigationFrame;
