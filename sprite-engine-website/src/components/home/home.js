import React from 'react';
import './home.css'; // Import CSS file for styling

function Home() {
  return (
      <div className="video-container">
        <video className="responsive-video" autoPlay loop muted>
          <source src="ressources/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-text">The C++  <br/> 2D Game Engine <br/> Of The Future.   </div>
      </div>
  );
}

export default Home;
