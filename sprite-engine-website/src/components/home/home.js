import React from 'react';
import { Link, CreateLink } from "components/link/link"
import LikeWindow from "components/likewindow/likewindow"

import './home.css';
import 'utils/general.css'

function Home() {

  let t = new Link("none", "Github", "https://github.com/jkatsanis");

  return (
    <div className="home-info">
      <div className="video-container">
        <video className="responsive-video" autoPlay loop muted>
          <source src="ressources/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-text">The C++ <br /> 2D Game Engine <br /> Of The Future.</div>
      </div>




      <div style={{ height: '5rem' }}></div>
        <div className="centered-div">
          <h1>Get started now</h1>
          <br/>
          <div className="separator"></div>
          <br/>


          <div style={{ height: '1rem' }}></div>
          <LikeWindow
            imageSrc="ressources/pictures/githubcover.png"
            title="Github"
            description="Check out our github! It's very simple and straigforward, for any questions, navigate to the FAQ"
            lin={t}    />

      </div>

    </div>
  );
}

export default Home;
