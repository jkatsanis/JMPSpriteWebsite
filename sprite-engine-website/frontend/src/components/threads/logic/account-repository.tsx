import { Account } from "./model";
import { bFetch } from "utils/general";
import { URL } from "macros";
import { Log } from "utils/general";

export class AccountRepository
{
    public active_account: Account | null;
    private url: string;


    constructor() {
        this.url = URL + "/api/accounts";
        this.active_account = null;
        this.m_inited = false;
    }

    public async init() : Promise<void>
    {
        if(this.m_inited)
        {
            Log.log("[REPO] Account repo already inited");
            return;
        }

        this.m_inited = true;

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

    async getAccountByName(name: string) : Promise<Account>
    {      
        const acc = await bFetch(this.url + "/picture/" + name, "GET");
        
        // Need to do shit

        const account: Account = new Account(name, "Manfred.png", "123", "123");

        return account;
    }
}

export let accountRepo = new AccountRepository();