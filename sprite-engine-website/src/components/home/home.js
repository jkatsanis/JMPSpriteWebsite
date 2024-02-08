import React from 'react';
import './home.css';
import 'utils/general.css'
import { Link } from "utils/util"

function Home() {
  return (
    <div>
      <div className="video-container">
        <video className="responsive-video" autoPlay loop muted>
          <source src="ressources/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-text">The C++ <br /> 2D Game Engine <br /> Of The Future.</div>
      </div>

      <Link icon="ressources/icons/github.png" content="Visit my GitHub" website="https://github.com/yourusername" />

    </div>
  );
}

export default Home;
