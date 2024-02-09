// src/components/TopBar.js
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import Home from 'components/home/home'
import Info from 'components/info'
import {Docu} from "components/docu/docu";
import {Threads} from "components/threads/threads";

import './topbar.css';

function TopBar() {
  return (
    <div>
      <div className="top-bar">
        <div className="logo">SpriteEngine</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/info">Info</Link></li>
              <li><Link to="/docu">Docu</Link></li>
                <li><Link to="/threads">Threads</Link></li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/info" component={Info} />
          <Route path="/docu" component={Docu}/>
            <Route path="/threads" component={Threads}/>
      </Switch>
    </div>
  );
}

export default TopBar;
