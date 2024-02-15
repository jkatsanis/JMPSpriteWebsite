import React from 'react';
import { handleClickNavigationFrame } from "components/docs/navigation/navigation-frames"

import 'utils/general.css';
import './content-table.css'; // Import CSS file for styling

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Optional: Adds smooth scrolling behavior
  });
};

const ContentTable: React.FC = () => {
  return (
    <div className='toc'>
        <button className="default-btn scroll" onClick={scrollToTop}>Scroll up</button>
        <li onClick={() => handleClickNavigationFrame("editor")}>
            Editor            
        </li>
        <li onClick={() => handleClickNavigationFrame("components")}>
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
            <li>Sprite</li>
            <li>Collider</li>
            <li>Physics</li>
          </ul>
        </div>
  </div>
  );
};

export default ContentTable;

