import Router from "express";
import {AccountRepository} from "../repos/accountRepository";
import {Account} from "../model";
import { STATUS_CODES } from "http";
import {StatusCodes} from "../model";

export const accountRouter = Router();

export const accountRepo = new AccountRepository("./data/accounts.sqlite");



accountRouter.get("/", async (req, res) => {
    res.status(StatusCodes.OK);
    res.send(await accountRepo.getAllAccounts());
    return;
});

accountRouter.get("/:username", async(req, res) => {
    const username = req.params.username;
    const repoReply = await accountRepo.getAccountByUsername(username);
    if (repoReply !== undefined){
        res.status(StatusCodes.OK);
        res.send(repoReply);
        return;
    }
    res.sendStatus(StatusCodes.NOT_FOUND);
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
    if (userName === null || email === null || password === null){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    if (!await accountRepo.addAccount(new class implements Account{
        userName = userName;
        email = email;
        password = password;
        picture = picture;
    })){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    res.sendStatus(StatusCodes.CREATED);
});
accountRouter.patch("/", async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const picture = req.body.picture;

    if (userName === null || email === null || password === null){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    await accountRepo.updateAccount(new class implements Account{
        userName = userName;
        email = email;
        password = password;
        picture = picture;
    });
    res.sendStatus(StatusCodes.OK);
});