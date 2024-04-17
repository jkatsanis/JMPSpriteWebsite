export class AccountRepository{
    private readonly accounts: Map<number, Account>;
    private currentId : number;

    constructor(accounts: Map<number, Account> | undefined) {
        if (accounts !== undefined){
            this.accounts = accounts;
        }
        else{
            this.accounts = new Map<number, Account>();
        }
        console.log("uga");
        this.currentId = 0;
    }

    public getAccountById(id: number): Account | undefined{
        return this.accounts.get(id);
    }
    public getAllAccounts(){
        return Array.from(this.accounts); //returns list of accounts as {Key, Value} objects
    }
    public deleteAccountById(id: number): boolean{
        return this.accounts.delete(id)
    }
    public addAccount(account: Account): void{
        this.accounts.set(this.currentId, account);
        this.currentId++;
    }
}

export interface Account{
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    picture: string;
}