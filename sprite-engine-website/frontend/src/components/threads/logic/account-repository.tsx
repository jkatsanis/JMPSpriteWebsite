import { Account } from "./model";
import { bFetch } from "utils/general";
import { URL } from "macros";

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
        const acc = await bFetch(this.url + "/picture/" + name, "GET");
        
        // Need to do shit

        const account: Account = new Account(name, "Manfred.png", "123", "123");

        return account;
    }
}

export let accountRepo = new AccountRepository();