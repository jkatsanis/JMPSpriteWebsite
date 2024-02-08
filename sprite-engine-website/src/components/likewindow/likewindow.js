import React from 'react';
import './likewindow.css'; // Import CSS for styling
 
import { CreateLink } from "utils/util"

const LikeWindow = ({ imageSrc, title, description, lin}) => {

  return (
    <div className="like-window">
      <img src={imageSrc} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <CreateLink Link={lin} />
      <p>oga</p>
    </div>
  );
};

export default LikeWindow;
