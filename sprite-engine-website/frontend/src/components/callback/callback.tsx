import React, { useEffect, useState } from "react";
import "./callback.css";
import config from "../../config";

const Callback: React.FC = () => {
    const [rerender, setRerender] = useState(false);
    const [countdown, setCountdown] = useState(3); // Initialize countdown state

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get("code");
        console.log(codeParam);

        if (codeParam && (localStorage.getItem("accessToken") === null)) {
            console.log("juhu");
            fetch(config.externalAddress + "/auth/getGithubAccessToken?code=" + codeParam, {
                method: "GET"
            }).then((response) => {
                return response.json();
            }).then((data) => {
                console.log(data);
                if (data.access_token) {
                    localStorage.setItem("accessToken", data.access_token);
                    localStorage.removeItem("loggedInUsername");
                    localStorage.removeItem("SEWAccessToken");

                    setRerender(!rerender);
                }
            }).catch((error)=> {
                alert(error);
            });
        }
    }, [rerender]);

    useEffect(() => {
        // Countdown logic
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // Redirect when countdown reaches 0
        if (countdown === 0) {
            window.location.href = config.address;
        }

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [countdown]);

    return (
        <div className="callback-page">
            <h1>Logged In!</h1>
            <p>Redirecting in {countdown}...</p> {/* Display countdown */}
        </div>
    );
};

export default Callback;