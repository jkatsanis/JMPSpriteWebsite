// src/components/TopBar.js
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Home from 'components/home'
import Info from 'components/info'

import './topbar.css'; // Import the CSS file for styling

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
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/info" component={Info} />
      </Switch>
    </div>
  );
}

export default TopBar;
