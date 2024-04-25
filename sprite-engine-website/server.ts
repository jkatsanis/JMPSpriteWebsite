import cors from "cors";
import express from "express";
import {accountRouter} from "./src/backend/routes/accountRouter";
import {threadRouter} from "./src/backend/routes/threadRouter";

const server = express();

server.use(cors());
server.use(express.static("public"));

server.use("/api/accounts", accountRouter);
server.use("/api/accounts", threadRouter);

server.listen(5000, () => {
    console.log("Server running on port 5000");
});