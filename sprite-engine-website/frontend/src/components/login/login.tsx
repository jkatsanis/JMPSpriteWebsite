import React from "react";
import "./login.css";
import {Link} from "react-router-dom";
import {login} from "components/register/register";
import config from "../../config";


const CLIENT_ID = "Ov23liMuRhXSWfALO4cu";
const Login: React.FC = () => {
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
            window.location.assign(config.address);
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