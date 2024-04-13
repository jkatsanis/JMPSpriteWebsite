import React from 'react';
import { handleClickNavigationFrame } from "frontend/components/docs/navigation/navigation-frames"

import 'frontend/utils/general.css';
import './content-table.css'; // Import CSS file for styling

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: Adds smooth scrolling behavior
  });
};

const ContentTable: React.FC = () => {
  return (
    <div>
      <button className="default-btn scroll" onClick={scrollToTop}>^</button>
      <div className='toc'>
          <li onClick={() => handleClickNavigationFrame("editor", 0)}>
              Editor            
          </li>
          <li onClick={() => handleClickNavigationFrame("components", 0)}>
              Components
          </li>
          <ul>
            <li>Physicsbody</li>
            <li>Animator</li>
            <li>Collider</li>
            <li>Light</li>
            <li>Prefab</li>
            <li>Transform</li>
            <li>Sprite Renderer</li>
          </ul> 
          <div style={{marginTop: '-1rem'}}>
            <li>
              spe::
            </li>
            <ul>
              <li onClick={() => handleClickNavigationFrame("sprite-docs", 0)}>Sprite</li>
              <li>Collider</li>
              <li>Physics</li>
            </ul>
          </div>
    </div>
  </div>
  );
};

export default ContentTable;

