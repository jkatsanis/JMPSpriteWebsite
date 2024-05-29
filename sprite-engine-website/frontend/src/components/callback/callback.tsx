import React, {useEffect, useState} from "react";
import "./callback.css";

const Callback: React.FC = () => {
    const [rerender, setRerender] = useState(false);
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if (codeParam && (localStorage.getItem("accessToken") === null)) {
            console.log("juhu");
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
    }, []);
    const handleGithubLogin = () => {
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID);
    };

    const handleKeycloakLogin = () => {
        window.location.assign("https://auth.htl-leonding.ac.at/realms/htl-leonding/protocol/openid-connect/auth?client_id=htlleonding-service");
    };

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle username and password login
        const username = (e.target as any).username.value;
        const password = (e.target as any).password.value;
        console.log("Username:", username, "Password:", password);
        // Add login logic here
    };

    return (
        <div className="callback-page">
            <h1 className="login-h">Logged In!</h1>
        </div>
    );
};

export default Callback;