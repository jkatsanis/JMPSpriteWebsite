import {Account, DB} from "../model";

export class AccountRepository {
    private dbPath: string;

    constructor(dbPath: string) {
        this.dbPath = dbPath;
    }

    public async getAccountByUsername(username: string): Promise<Account|undefined>{
        return await DB.select(`SELECT * FROM accounts WHERE userName = '${username}'`, this.dbPath);
    }

    public async getAllAccounts() {
        return await DB.selectAll("SELECT * FROM accounts", this.dbPath)
    }

    public async deleteAccountByUsername(username: string): Promise<boolean> {
        if (await this.getAccountByUsername(username) === undefined){
            return true;
        }
        const deleteStatement = `
        DELETE FROM accounts WHERE userName = '${username}'
        `;
        await DB.run(deleteStatement, this.dbPath);
        return true;
    }

    public async addAccount(account: Account): Promise<boolean> {
        if (await this.getAccountByUsername(account.userName) !== undefined){
            return false;
        }
        const insertStatement = `
        INSERT INTO accounts (userName, email, password, picture) 
        VALUES ('${account.userName}', '${account.email}', '${account.password}', '${account.picture}')
        `;
        await DB.run(insertStatement, this.dbPath);
        return true;
    }
    public async updateAccount(account: Account): Promise<boolean> {
        if (await this.getAccountByUsername(account.userName) === undefined) {return false;}
        const insertStatement = `
        REPLACE INTO accounts (userName, email, password, picture) 
        VALUES ('${account.userName}', '${account.email}', '${account.password}', '${account.picture}')
        `;
        await DB.run(insertStatement, this.dbPath);
        return true;
    }

}
