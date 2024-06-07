import Router from "express";
import {AccountRepository} from "../repos/accountRepository";
import {Account} from "../model";
import {StatusCodes} from "../model";
import {v4 as uuidv4} from 'uuid';

export const accountRouter = Router();

export const accountRepo = new AccountRepository("./data/accounts.sqlite");

accountRouter.post("/login", async(req, res) => {

    if (req.headers.username && !Array.isArray(req.headers.username) && req.headers.password && !Array.isArray(req.headers.password)){
        const username : string = req.headers.username;
        const password : string = req.headers.password;
        const user = await accountRepo.getAccountByUsername(username);
        if (user) {
            if (username === user?.userName && password === user.password) {
                let SEWAccessToken = uuidv4();
                await accountRepo.updateSEWAccessToken(SEWAccessToken, username);
                res.status(StatusCodes.OK)
                res.send(await accountRepo.getAccountByUsername(username));
                return;
            }
        }
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
});
accountRouter.post("/loginWithToken", async(req, res) => {
    if (req.headers.username && !Array.isArray(req.headers.username) && req.headers.SWEAccessToken && !Array.isArray(req.headers.SWEAccessToken)){
        const username : string = req.headers.username;
        const token : string = req.headers.SWEAccessToken;
        const user = await accountRepo.getAccountByUsername(username);
        if (user) {
            if (username === user?.userName && token === user.SWEAccessToken) {
                res.status(StatusCodes.OK)
                res.send(await accountRepo.getAccountByUsername(username));
                return;
            }
        }
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
    return;
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
        SWEAccessToken = null;
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
        SWEAccessToken = null;
    });
    res.sendStatus(StatusCodes.OK);
});