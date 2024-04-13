import Router from "express";
import {AccountRepository} from "../repos/accountRepository";
import {Account} from "../repos/accountRepository";
import { STATUS_CODES } from "http";

export const accountRouter = Router();

const accountRepo = new AccountRepository(undefined);

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

accountRouter.get("/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (!isNaN(parsedId)){
        res.status(StatusCodes.OK);
        res.send(accountRepo.getAccountById(parseInt(req.params.id)));
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
});
accountRouter.delete("/:id", (req, res) => {
    const parsedId = parseInt(req.params.id);
    if (!isNaN(parsedId)){
        if (!accountRepo.deleteAccountById(parseInt(req.params.id))){
            res.sendStatus(StatusCodes.NOT_FOUND);
        }
        res.sendStatus(StatusCodes.OK);
    }
    res.sendStatus(StatusCodes.BAD_REQUEST);
});
accountRouter.post("/", (req, res) => {
    const { firstName, lastName, userName, email, password, picture } = req.body;
    accountRepo.addAccount(new class implements Account{
        firstName = firstName;
        lastName = lastName;
        userName = userName;
        email = email;
        password = password;
        picture = picture;
    });
    res.sendStatus(StatusCodes.CREATED);
});