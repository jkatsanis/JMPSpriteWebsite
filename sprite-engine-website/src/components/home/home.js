import React from 'react';
import './home.css';
import 'utils/general.css'
import { Link, CreateLink } from "utils/util"
import LikeWindow from "components/likewindow/likewindow"


function Home() {

  let t = new Link("ressources/icons/github.png", "Github", "https://github.com/jkatsanis");

  return (
    <div>
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
          <div style={{ height: '1rem' }}></div>
          <CreateLink Link={t} />

          <LikeWindow
            imageSrc="path/to/your/image.jpg"
            title="Example Title"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            lin={t}    />

      </div>

    </div>
  );
}

export default Home;
