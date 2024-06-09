import Router from "express";
import {AccountRepository} from "../repos/accountRepository";
import {Account} from "../model";
import {StatusCodes} from "../model";
import {v4 as uuidv4} from 'uuid';
import { STATUS_CODES } from "http";

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

accountRouter.get("/picture/:username",  async(req, res) => {
    const username = req.params.username;

    const acc: Account | undefined = await accountRepo.getAccountByUsername(username);

    if(acc === undefined)
    {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    res.status(StatusCodes.OK); 
    res.send(acc.picture);
});

accountRouter.post("/loginWithToken", async(req, res) => {
    console.log(req.headers.username);
    console.log(req.headers.sewaccesstoken);
    if (req.headers.username && !Array.isArray(req.headers.username) && req.headers.sewaccesstoken && !Array.isArray(req.headers.sewaccesstoken)){
        const username : string = req.headers.username;
        const token : string = req.headers.sewaccesstoken;
        const user = await accountRepo.getAccountByUsername(username);
        if (user) {
            if (username === user?.userName && token === user.SEWAccessToken) {
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
accountRouter.post("/updatePicture", async (req, res) => {
    const userName = req.body.userName;
    const picture = req.body.picture;
    if (userName === null || picture === null){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    if (!await accountRepo.updatePicture(picture, userName)){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    res.sendStatus(StatusCodes.CREATED);
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
        SEWAccessToken = null;
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
        SEWAccessToken = null;
    });
    res.sendStatus(StatusCodes.OK);
});