import cors from "cors";
import express from "express";
import {accountRouter} from "./routes/accountRouter";
import {threadRouter} from "./routes/threadRouter";

const server = express();

server.use(cors());
server.use(express.json());

server.use(express.static("build"));

server.use("/api/accounts", accountRouter);
server.use("/api/questions", threadRouter);

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
