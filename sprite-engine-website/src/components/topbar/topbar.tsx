// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';

import './topbar.css';


const TopBar: React.FC = () => {
  return (
    <div>
      <div className="top-bar">
        <div className="logo">SpriteEngine</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/info">Info</Link></li>
            <li><Link to="/docu">Documentation</Link></li>
            <li><Link to="/threads">Threads</Link></li>
          </ul>
        </nav>
      </div>
        
    </div>
  );
}

export default TopBar;
