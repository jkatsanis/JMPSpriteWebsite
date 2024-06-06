import { Account } from "./model";
import { bFetch } from "utils/general";
import { URL } from "macros";
import { Log } from "utils/general";

export class AccountRepository
{
    private accounts: Account[];

    public active_account: Account | null;
    private url: string;

    private m_inited:boolean;

    constructor() {
        this.url = URL + "/api/accounts";
        this.accounts = [];
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

        let acc: Account = new Account("Manfred", "123Oga", "Manfred.png", "Manfred@gmail.com");
        this.active_account = acc;

        await this.addAccount(acc);

        await this.readAccountsFromDB();
        console.log(this.accounts);
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

    getAccounts() : Account[]
    {
        return this.accounts;
    }

    getAccountByName(name: string) : Account
    {
        for(let i = 0; i < this.accounts.length; i++)
        {
            if(name === this.accounts[i].name)
            {
                return this.accounts[i];
            }
        }

        return null!;
    }
}

export let accountRepo = new AccountRepository();