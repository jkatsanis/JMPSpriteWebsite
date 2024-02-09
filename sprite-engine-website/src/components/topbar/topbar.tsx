// src/components/TopBar.js
import React from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';



import './topbar.css';
import Home from "../home/home";
import Info from "../info";

const TopBar: React.FC = () => {
  return (
    <div>
      <div className="top-bar">
        <div className="logo">SpriteEngine</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/info">Info</Link></li>
          </ul>
        </nav>
      </div>
        
    </div>
  );
}

export default TopBar;
