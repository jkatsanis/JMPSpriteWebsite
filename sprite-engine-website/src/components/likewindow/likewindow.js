import React from 'react';
import './likewindow.css'; // Import CSS for styling
 
import { CreateLink } from "components/link/link"

/*
    420 * 402 optimal window size
*/
const LikeWindow = ({ imageSrc, title, description, lin}) => {

  return (
    <div className="like-window">
      <img src={imageSrc} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <CreateLink Link={lin} />
    </div>
  );
};

export default LikeWindow;
