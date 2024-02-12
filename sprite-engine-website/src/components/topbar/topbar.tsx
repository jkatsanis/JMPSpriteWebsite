// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';

import './topbar.css';
import 'utils/general.css';


const TopBar: React.FC = () => {
  return (
    <div>
      <div className="top-bar">

        <div className='centered-div'>
          <div style={{marginTop: '0.5rem'}}></div>
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
       
    </div>
  );
}

export default TopBar;
