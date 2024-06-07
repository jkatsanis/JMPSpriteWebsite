import React, {useEffect, useState} from "react";
import "./login.css";
import {accountRepo} from "components/threads/logic/account-repository";
import {Account} from "components/threads/logic/model";


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
        console.log("Username:", username, "Password:", password);

        await fetch("http://localhost:5000/loginWithToken", {
            method: "POST",
            headers: {
                "username": username,
                "password": password
            }
        }).then((response) => {
            if (response.status === 200){
                console.log("wrong username or password");
            }
            return response.json();
        }).then((data) => {
            accountRepo.active_account = new Account(data.name, data.password, data.picture, data.email)
            localStorage.removeItem("accessToken");
            localStorage.setItem("SEWAccessToken", data.SWEAccessToken)
            localStorage.setItem("loggedInUsername", data.SWEAccessToken)
        });
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
            </div>
        </div>
    );
};

export default Login;