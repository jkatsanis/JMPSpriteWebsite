// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { threadRepo } from 'frontend/components/threads/logic/thread-repository';

import { PATH_TO_ACCOUNT_FOLDER } from 'macros';

import './topbar.css';
import 'frontend/utils/general.css';

const TopBar: React.FC = () => {

  let name = "Account";
  let pic = `${PATH_TO_ACCOUNT_FOLDER}/accounts/icons/`; //  uga uga sache
  if(threadRepo.active_account !== null)
  {
    name = threadRepo.active_account.name;
    pic = threadRepo.active_account.picture;
  }
  else {
    pic += "default.png"
  }
  
  return (
    <div>
      <div className="top-bar">
      <div className='h-1'/>
        <div className=''>        
            <div className='centered-div'>
              <div style={{marginTop: '0.5rem'}}></div>
                <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/info">Info</Link></li>
                  <li><Link to="/docu">Documentation</Link></li>
                  <li><Link to="/threads">Threads</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  <li>
                    <div>
                      <img style={{ width: 25, height: 25 }} src={pic} alt="Icon"/>
                      <p className="link-i-a">{name}</p>
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
