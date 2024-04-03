
import express from "express";
import {accountRouter} from "./routes/accountRouter";
import {threadRouter} from "./routes/threadRouter";

const app = express();

app.use(express.json);
app.use(express.static("public"));

app.use("/api/accounts", accountRouter);
app.use("/api/accounts", threadRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});