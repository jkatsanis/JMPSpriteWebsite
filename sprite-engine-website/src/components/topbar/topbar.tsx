// src/components/TopBar.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';



import './topbar.css';
import Home from "../home/home";
import Info from "../info";

function TopBar() {
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
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/info" element={<Info/>} />
      </Routes>
    </div>
  );
}

export default TopBar;
