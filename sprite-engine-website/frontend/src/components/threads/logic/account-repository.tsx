import { Account } from "./model";
import { bFetch } from "utils/general";
import { URL } from "macros";
import config from "../../../config";

export class AccountRepository
{
    public active_account: Account | null;
    private url: string;

    constructor() {
        this.url = URL + "/api/accounts";
        this.active_account = null;
    }

    async addAccount(account: Account): Promise<Response>
    {
        let obj = new class {
            userName = account.name;
            email = account.email;
            password = account.password;
            picture = account.picture;
        };

        return await bFetch(this.url, "POST", obj);
    }

    async getAccountByName(name: string) : Promise<Account>
    {      
        const url = config.externalAddress + "/staticressources/avatars/" + name + ".webp"; // 10 EURO FIXXEN BITTE !=!==!=!

        const account: Account = new Account(name, "123", url, "123");

        return account;
    }
}

export let accountRepo = new AccountRepository();