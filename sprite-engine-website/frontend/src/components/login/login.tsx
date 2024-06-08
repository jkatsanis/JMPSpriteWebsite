import React, {useEffect, useState} from "react";
import "./login.css";
import {accountRepo} from "components/threads/logic/account-repository";
import {Account} from "components/threads/logic/model";
import {Link} from "react-router-dom";
import {login} from "components/register/register";


const CLIENT_ID = "Ov23liMuRhXSWfALO4cu";
const Login: React.FC = () => {
    const [rerender, setRerender] = useState(false);
    /*useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if (codeParam && (localStorage.getItem("accessToken") === null)) {
            fetch("http://localhost:5000/getGithubAccessToken?code=" + codeParam, {
                method: "GET"
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                if (data.access_token){
                    localStorage.setItem("accessToken", data.access_token);
                    console.log("yes");
                    setRerender(!rerender)
                }
            })
        }
    }, []);*/
    const handleGithubLogin = () => {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = (e.target as any).username.value;
        const password = (e.target as any).password.value;
        console.log("yhuh")
        if (!await login(username, password)){
            alert("wrong username or password");
        }
        else{
            window.location.assign("http://localhost:3000");
        }
    };

    return (
        <div className="login-page">
            <h1 className="login-h">Login</h1>
            <div className="login-options">
                <button className="btn github" onClick={handleGithubLogin}>
                    Login with GitHub
                </button>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <div className="register-link">
                    <span>Don't have an account? </span>
                    <Link to="/register">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;