import Router from "express";
import {AccountRepository} from "../repos/accountRepository";
import {Account} from "../repos/accountRepository";
import { STATUS_CODES } from "http";

export const accountRouter = Router();

const accountRepo = new AccountRepository("./data/accounts.sqlite");

const StatusCodes = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
};

accountRouter.get("/", (req, res) => {
    res.status(StatusCodes.OK);
    res.send(accountRepo.getAllAccounts());
});

accountRouter.get("/:id", async(req, res) => {
    const parsedId = parseInt(req.params.id);
    if (!isNaN(parsedId)){
        res.status(StatusCodes.OK);
        res.send(accountRepo.getAccountById(parseInt(req.params.id)));
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
});
accountRouter.delete("/:id", async(req, res) => {
    const parsedId = parseInt(req.params.id);
    if (!isNaN(parsedId)){
        if (!await accountRepo.deleteAccountById(parseInt(req.params.id))){
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
        res.sendStatus(StatusCodes.OK);
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
});
accountRouter.post("/", async (req, res) => {
    const { id, userName, email, password, picture } = req.body;
    await accountRepo.addAccount(new class implements Account{
        id = id;
        userName = userName;
        email = email;
        password = password;
        picture = picture;
    });
    res.sendStatus(StatusCodes.CREATED);
});