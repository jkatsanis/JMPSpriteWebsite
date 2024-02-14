import React from 'react';
import "components/link/link.css"

interface IconTextProps {
    iconPath: string;
    text: string;
}

const IconText: React.FC<IconTextProps> = ({ iconPath, text }) => {
    return (
        <div>
          <img style={{ width: 30, height: 30 }} src={iconPath} alt="Icon"/>
          <p className="link-i">{text}</p>
        </div>
      );                   
};

export default IconText;
