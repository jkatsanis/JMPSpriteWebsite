// src/components/TopBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { accountRepo } from '../threads/logic/account-repository';
import { PATH_TO_ACCOUNT_FOLDER } from 'frontend/macros';

import './topbar.css';
import 'frontend/utils/general.css';
import { getOriginalPicturePath } from 'frontend/utils/general';

const TopBar: React.FC = () => {

  let name = "Account";
  let pic = "default.png";
  if(accountRepo.active_account !== null)
  {
    name = accountRepo.active_account.name;
    pic = getOriginalPicturePath(accountRepo.active_account.picture);
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
                  <li><Link to="/login">Login</Link></li>
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
