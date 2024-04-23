import cors from "cors";
import express from "express";
import {accountRouter} from "./src/backend/routes/accountRouter";
import {threadRouter} from "./src/backend/routes/threadRouter";

const server = express();

server.use(cors());
server.use(express.static("build"));

server.use("/api/accounts", accountRouter);
server.use("/api/accounts", threadRouter);


server.get("/", (req,res)=> {
    res.send("hello from express");
})
server.listen(5000, () => {
    console.log("Server running on port 5000");
});
