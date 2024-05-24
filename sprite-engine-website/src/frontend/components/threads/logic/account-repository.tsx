import { Account } from "./model";
import { bFetch } from "frontend/utils/general";
import { URL } from "frontend/macros";

export class AccountRepository
{
    private accounts: Account[];

    public active_account: Account | null;
    private url: string;

    constructor() {
        this.url = URL + "/api/accounts";
        this.accounts = [];
        this.active_account = null;
        this.init();
    }

    async init()
    {
        let acc: Account = new Account("Manfred", "123Oga", "Manfred.png", "Manfred@gmail.com");
        this.active_account = acc;

        await this.addAccount(acc);

        await this.readAccountsFromDB();
    }

    async readAccountsFromDB()
    {
        let accounts: any[] = await bFetch(this.url, "GET");

        for(let i = 0; i < accounts.length; i++)
        {
            const an = accounts[i];

            let acc = new Account(an.userName, an.password, an.picture, an.email);

            this.accounts.push(acc);
        } 
    }

    async addAccount(account: Account)
    {
        let obj = new class {
            userName = account.name;
            email = account.email;
            password = account.password;
            picture = account.picture;
        };

        await bFetch(this.url, "POST", obj);
    }
}

export let accountRepo = new AccountRepository();