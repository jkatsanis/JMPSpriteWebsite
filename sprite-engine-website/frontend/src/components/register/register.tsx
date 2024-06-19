import React, { useState } from "react";
import { accountRepo } from "components/threads/logic/account-repository";
import { Account } from "components/threads/logic/model";
import {isLoggedIn} from "components/topbar/topbar";
import config from "../../config";

import "./register.css";

export async function login(username: string, password: string): Promise<boolean>{
    if (isLoggedIn){
        alert("already logged in");
    }
    await fetch(config.externalAddress + "/api/accounts/login", {
        method: "POST",
        headers: {
            "username": username,
            "password": password
        }
    }).then((response) => {
        if (response.status !== 200){
            console.log("wrong username or password");
        }
        return response.json();
    }).then((data) => {
        accountRepo.active_account = new Account(data.userName, data.password, data.picture, data.email)
        console.log(accountRepo.active_account)
        localStorage.removeItem("accessToken");
        localStorage.setItem("SEWAccessToken", data.SEWAccessToken);
        localStorage.setItem("loggedInUsername", data.userName);
    });
    return localStorage.getItem("SEWAccessToken") !== undefined;
};
const Register: React.FC = () => {
    const [rerender, setRerender] = useState(false);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("username") as string;
        const password = formData.get("password") as string;
        const email = formData.get("email") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const picture = formData.get("avatar") as File;
        let registrationSuccessful = true;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const account : Account = {
            name,
            password,
            email,
            picture: config.externalAddress + "/static/avatars/default.webp"
        };
        await fetch(config.externalAddress + "/api/accounts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: account.name,
                email: account.email,
                password: account.password,
                picture: account.picture,
            })
        }).then((response) => {
            if (response.status !== 201){
                console.log(response.status)
                alert("registration failed");
                registrationSuccessful = false;
            }
        });
        if (registrationSuccessful){
            if (picture !== null){
                let imageData = new FormData();
                imageData.append('avatar', picture);
                await fetch(config.externalAddress + "/api/avatars/"+ name,{
                    method: "PUT",
                    body: imageData
                })        
            }
            alert("Registration successful");
            setRerender(!rerender);
            await login(name, password);
            window.location.assign(config.address);
        }

    };

    return (
        <div className="register-page">
            <h1 className="register-h">Register</h1>
            <div className="register-options">
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="username">Unique Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="avatar">Avatar:</label>
                        <input type="file" id="avatar" name="avatar" accept="image/*" />
                    </div>
                    <button type="submit" className="btn">Register</button>
                </form>
            </div>
        </div>
    );
};


export default Register;