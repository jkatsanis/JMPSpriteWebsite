// src/components/TopBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { accountRepo } from '../threads/logic/account-repository';
import './topbar.css';
import {Account} from "components/threads/logic/model";
import config from "../../config";

// Define the user data interface
interface User {
  login: string;
  avatar_url: string;
}
export const isLoggedIn = localStorage.getItem("accessToken") != null || localStorage.getItem("SEWAccessToken") != null;

const TopBar: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUserData() {
        try {
          const response = await fetch(config.externalAddress + "/getUserData", {
            method: "GET",
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
          });
          const data: User = await response.json();
          setUser(data);
          accountRepo.active_account = new Account(data.login, "", data.avatar_url, "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
    }
    async function autoLogin() {
      const SEWAccessToken = localStorage.getItem("SEWAccessToken");
      const username = localStorage.getItem("loggedInUsername");
      if (SEWAccessToken !== null && username !== null){
        await fetch(config.externalAddress + "/api/accounts/loginWithToken", {
          method: "POST",
          headers: {
            "SEWAccessToken": SEWAccessToken,
            "username": username
          }
        }).then((response)=> {
          return response.json();
        }).then((data) => {
          accountRepo.active_account = new Account(data.userName, data.password, data.picture, data.email)
          setUser({login: accountRepo.active_account.name, avatar_url: accountRepo.active_account.picture})
        });
        setLoading(false);
      }
    }
    if (localStorage.getItem("SEWAccessToken") != null){
      autoLogin();
    }
    if (localStorage.getItem("accessToken") !== null){
      fetchUserData();

    }
  }, [isLoggedIn]);

  async function logout() {
    if (isLoggedIn) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("SEWAccessToken");
      localStorage.removeItem("loggedInUsername");
      accountRepo.active_account = null;
      setUser(null);
    }

    window.location.reload();
  }

  let name = "defaultAccount";
  let pic = `icons/default.png`;

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
