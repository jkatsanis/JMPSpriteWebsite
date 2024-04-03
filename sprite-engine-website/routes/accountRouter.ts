import Router from "express";
import {AccountRepository} from "../repos/accountRepository";
import StatusCodes from "http-status-codes";
import {Account} from "../repos/accountRepository";

export const accountRouter = Router();

const accountRepo = new AccountRepository(undefined);

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
    const { firstName, lastName, userName, email, password } = req.body;
    accountRepo.addAccount(new class implements Account{
        firstName = firstName;
        lastName = lastName;
        userName = userName;
        email = email;
        password = password;
    });
    res.sendStatus(StatusCodes.CREATED);
});