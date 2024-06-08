import cors from "cors";
import express from "express";
import {accountRouter} from "./routes/accountRouter";
import {threadRouter} from "./routes/threadRouter";
import * as process from "process";
import {STATUS_CODES} from "http";
import {StatusCodes} from "./model";
import {projectRouter} from "./routes/projectRouter";
import config from "./config";
import dotenv from "dotenv"
import {avatarRouter} from "./routes/avatarRouter";

const path = require('path');
dotenv.config();
const server = express();


//process.env.SECRET_KEY

server.use(cors());
server.use(express.json());

server.use(express.static("public"));

server.use("/api/accounts", accountRouter);
server.use("/api/questions", threadRouter);
server.use("/api/projects", projectRouter);
server.use("/api/avatars", avatarRouter)


server.get("/getGithubAccessToken", async (req, res)=> {
    const params = "?client_id=" + process.env.REACT_APP_GITHUB_CLIENT_ID + "&client_secret=" + process.env.REACT_APP_GITHUB_CLIENT_SECRET + "&code=" + req.query.code;
    await fetch("https://github.com/login/oauth/access_token" + params, {
        method: "POST",
        headers: {
            "Accept": "application/json"
        }
    }).then((response)=> {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});

server.get("/getUserData", async (req, res) => {
    if (req.get("Authorization") === undefined){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    await fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
            "Authorization": req.get("Authorization")!
        }
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
        res.json(data);
    });
});
server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'..','..', 'build', 'index.html'));
});

server.listen(config.port, () => {
    console.log(`Server is running at ${config.address}`);
    console.log(`External Server is running at ${config.externalAddress}`);
});
