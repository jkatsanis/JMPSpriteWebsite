import React from 'react';
import { Link, CreateLink } from "components/link/link"
import LikeWindow from "components/likewindow/likewindow"

import './home.css';
import 'utils/general.css'

function Home() {

  let website = new Link("ressources/icons/github.png", "Github", "https://github.com/jkatsanis");
  let engine = new Link("ressources/icons/github.png", "Github", "https://github.com/jkatsanis/SpriteEngineUI");
  const myLeftValue = 100;

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

          <div className="separator"></div>


          <div style={{ height: '1rem' }}></div>


          <div className="like-windows-container">
            <LikeWindow
              imageSrc="ressources/pictures/githubcover.png"
              title="Github-Website"
              description="Check out our github! It's very simple and straigforward, for any questions, navigate to the FAQ"
              lin={website}/>

            <LikeWindow
                imageSrc="ressources/pictures/githubcoverEngine.png"
                title="Github-GameEngine"
                description="This Project is a simple 2D Game Engine designed to be fully understand by one Person. It is written in pure C++, with the support of SFML & Imgui"
                lin={engine}/>
          </div>

      </div>

    </div>
  );
}

export default Home;
