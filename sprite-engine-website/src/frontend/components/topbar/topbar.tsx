// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { threadRepo } from 'frontend/components/threads/logic/thread-repository';
import IconText from '../icontext';

import './topbar.css';
import 'frontend/utils/general.css';


const TopBar: React.FC = () => {

  let pic = "ressources/account/icons";
  if(threadRepo.active_account?.picture !== null)
  {
    pic = threadRepo.active_account!.picture;
  }

  const defaultImage = require('../../../backend/accounts/icons/default.png');
  
  return (
    <div>
      <div className="top-bar">
        <div className=''>
            
            <div className='centered-div'>
              <div style={{marginTop: '0.5rem'}}></div>
                <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/info">Info</Link></li>
                  <li><Link to="/docu">Documentation</Link></li>
                  <li><Link to="/threads">Threads</Link></li>
                  <li>
                    <div>
                      <img style={{ width: 25, height: 25 }} src={defaultImage} alt="Icon"/>
                      <p className="link-i">Account</p>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>

        </div>   
      </div>   
    </div>
  );
}

export default TopBar;
