import React from 'react';
import LikeWindow from "../likewindow/likewindow";
import CreateLink, { Link } from "../icon/link";
import { Page } from 'components/page';

import './home.css';
import 'utils/general.css';
import "components/likewindow/likewindow.css"

const Home: React.FC = () => {

  let website = new Link("ressources/icons/github.png", "Github", "https://github.com/jkatsanis");
  let engine = new Link("ressources/icons/github.png", "Github", "https://github.com/jkatsanis/SpriteEngineUI");
  let youtube = new Link("ressources/icons/youtube.png", "Youtube", "https://www.youtube.com/channel/UCWihpyidnoBJ4G-V2TT6bVw");
  let Download = new Link("ressources/icons/download.png", "Download SpriteEngine x64 V. 1.0", "https://uga.com");
  let OlderDownload = new Link("ressources/icons/download.png", "Download SpriteEngine x64 V. X", "https://uga.com");

  return (
    <Page>
      <div className="home-info">
        <div className="video-container">
          <video className="responsive-video" autoPlay loop muted>
            <source src="ressources/videos/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag!.
          </video>
          <div className="video-text">The C++ <br /> 2D Game Engine <br /> Of The Future.</div>

          <button className='video-btn'>
             <a href="#download-header" style={{color: 'white'}}>Download</a>
          </button>
        </div>

        <div className='h-3' />
        <div className='first-color'>
          <div className='centered-div'>
            <h1>Get started now</h1>
            <div className="separator"></div>
            <div className="like-windows-container">
              <LikeWindow
                imageSrc="ressources/pictures/githubcover.png"
                title="Github-Website"
                description="Check out our github! It's very simple and straigforward, for any questions, navigate to the FAQ"
                lin={website} 
                onClickCallback={null}/>

              <LikeWindow
                imageSrc="ressources/pictures/githubcoverEngine.png"
                title="Github-GameEngine"
                description="This Project is a simple 2D Game Engine designed to be fully understand by one Person. It is written in pure C++, with the support of SFML & Imgui"
                lin={engine} 
                onClickCallback={null}/>

              <LikeWindow
                imageSrc="ressources/pictures/youtubecover.png"
                title="Youtube"
                description="Feel free to watch my youtube videos, I introduce the gameengine, introduce new functions and create devlogs."
                lin={youtube} 
                onClickCallback={null}/>
            </div>
          </div>
          <div className='h-3'/>
        </div>

        <div className='second-color'>
          <div className='centered-div'>
            <div style={{ height: '1.5rem' }}></div>
            <h1>General infos</h1>
            <div className="separator"></div>
            <div className="like-windows-container">
              <LikeWindow
                imageSrc="ressources/pictures/c++.png"
                title="Programming language"
                description="The entire engine is writting in pure C++ without any other languages. So the scripiting does also only work with C++"
                lin={null} 
                onClickCallback={null}/>

              <LikeWindow
                imageSrc="ressources/pictures/tools.png"
                title="Tools used"
                description="SFML is used for the rendering, imgui is used for the entire UI."
                lin={null} 
                onClickCallback={null}/>

              <LikeWindow
                imageSrc="ressources/pictures/pixelgame.png"
                title="2D"
                description="The engine does obviously only support 2D. As the name is <SpriteEngine>,   thus only supporting sprites."
                lin={null}
                onClickCallback={null} />
            </div>
          </div>
          <div className='h-3'/>
        </div>

        <div className='first-color'>
          <div className='centered-div'>
            <br />
            <h1 id="download-header">Interested? Download now</h1>
            <div className="separator"></div>

            <h2>Newest version</h2>
            <CreateLink Link={Download} left={10}></CreateLink>

            <h2>Older versions</h2>
            <CreateLink Link={OlderDownload} left={10}></CreateLink>
          </div>
        </div>
      </div>

    </Page>
  );
}

export default Home;
