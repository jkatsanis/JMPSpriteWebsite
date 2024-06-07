// src/components/TopBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { accountRepo } from '../threads/logic/account-repository';
import './topbar.css';
import {PATH_TO_ACCOUNT_FOLDER} from "../../macros";
// Define the user data interface
interface User {
  login: string;
  avatar_url: string;
}

const TopBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = localStorage.getItem("accessToken") !== null || accountRepo.active_account !== null;

  useEffect(() => {
    async function fetchUserData() {
      if (isLoggedIn) {
        try {
          const response = await fetch("http://localhost:5000/getUserData", {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
          });
          const data: User = await response.json();
          setUser(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    console.log(isLoggedIn);
    if (localStorage.getItem("accessToken") !== null){
      fetchUserData();
    }
  }, [isLoggedIn]);

  async function logout() {
    if (isLoggedIn) {
      localStorage.removeItem("accessToken");
      accountRepo.active_account = null;
      setUser(null);
    }
    window.location.reload();
  }

  let name = "Account";
  let pic = `${PATH_TO_ACCOUNT_FOLDER}/accounts/icons/default.png`;

  if (user) {
    name = user.login;
    pic = user.avatar_url || pic;
  } else if (accountRepo.active_account !== null) {
    name = accountRepo.active_account!.name;
    pic = accountRepo.active_account!.picture;
  }

  return (
      <div>
        <div className="top-bar">
          <div className='h-1' />
          <div className=''>
            <div className='centered-div'>
              <div style={{ marginTop: '0.5rem' }}></div>
              <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/info">Info</Link></li>
                  <li><Link to="/docu">Documentation</Link></li>
                  <li><Link to="/threads">Threads</Link></li>
                  <li><Link to="/projects">Projects</Link></li>
                  {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
                  {isLoggedIn && !loading && (
                      <li className="account-prev">
                        <img className="profile-pic" src={pic} alt="Icon" />
                        <div className="link-i-a">{name}</div>
                        <button className="logout-button" onClick={logout}>Logout</button>
                      </li>
                  )}

                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
  );
}

export default TopBar;
