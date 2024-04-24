import Router from "express";
import {AccountRepository} from "../repos/accountRepository";
import {Account} from "../repos/accountRepository";
import { STATUS_CODES } from "http";

export const accountRouter = Router();

const accountRepo = new AccountRepository("./data/accounts.sqlite");

const StatusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};

accountRouter.get("/", (req, res) => {
    res.status(StatusCodes.OK);
    res.send(accountRepo.getAllAccounts());
});

accountRouter.get("/:username", async(req, res) => {
    const username = req.params.username;
    const repoReply = await accountRepo.getAccountByUsername(username);
    if (repoReply !== undefined){
        res.status(StatusCodes.OK);
        res.send(repoReply);
        return;
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
});
accountRouter.delete("/:username", async(req, res) => {
    const username = req.params.username;
        if (!await accountRepo.deleteAccountByUsername(username)){
            res.sendStatus(StatusCodes.NOT_FOUND);
            return;
        }
        res.sendStatus(StatusCodes.OK);
        return;
});
accountRouter.post("/", async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const picture = req.body.picture;
    await accountRepo.addAccount(new class implements Account{
        userName = userName;
        email = email;
        password = password;
        picture = picture;
    });
    res.sendStatus(StatusCodes.CREATED);
});
accountRouter.patch("/", async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const picture = req.body.picture;

    await accountRepo.updateAccount(new class implements Account{
        userName = userName;
        email = email;
        password = password;
        picture = picture;
    });
    res.sendStatus(StatusCodes.OK);
});