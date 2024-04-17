import { Database as Driver, OPEN_CREATE, OPEN_READONLY, OPEN_READWRITE } from "sqlite3";
import { open, Database } from "sqlite";

export class AccountRepository {
    private dbPath: string;
    private currentId: number;

    constructor(dbPath: string) {

        this.currentId = 0;
        this.dbPath = dbPath;
    }

    public async getAccountById(id: number): Promise<Account|undefined>{
        return await DB.select("SELECT * FROM accounts", this.dbPath);
    }

    public async getAllAccounts() {
        return await DB.selectAll("SELECT * FROM accounts", this.dbPath)
    }

    public async deleteAccountById(id: number): Promise<boolean> {
        const deleteStatement = `
        DELETE FROM accounts WHERE id = ${id}
        `;
        const result = await DB.run(deleteStatement, this.dbPath);
        if (result === undefined){
            return false;
        }
        return result.count > 0;

    }

    public async addAccount(account: Account): Promise<void> {
        const insertStatement = `
        INSERT INTO accounts (id, userName, email, password, picture) 
        VALUES (${account.id}, '${account.userName}', '${account.email}', '${account.password}', '${account.picture}')
        `;
        await DB.run(insertStatement, this.dbPath);
        this.currentId++;
    }
}
export class DB {
    public static async createDBConnectionReadOnly(dbFileName: string): Promise<Database> {
        const db = await open({
            filename: `./${dbFileName}`,
            driver: Driver,
            mode: OPEN_READONLY
        });

        await db.run('PRAGMA foreign_keys = ON');

        return db;
    }
    public static async createDBConnectionReadWrite(dbFileName: string): Promise<Database> {
        const db = await open({
            filename: `./${dbFileName}`,
            driver: Driver,
            mode: OPEN_READWRITE
        });

        await db.run('PRAGMA foreign_keys = ON');

        return db;
    }

    public static async selectAll(selectStaement: string, dbFileName: string): Promise<any> {
        const db = await DB.createDBConnectionReadOnly(dbFileName);
        const selected : Account[] = await db.all<Account[]>(selectStaement);
        await db.close();

        return selected;
    }
    public static async select(selectStaement: string, dbFileName: string): Promise<any> {
        const db = await DB.createDBConnectionReadOnly(dbFileName);
        const selected : Account | undefined = await db.get<Account>(selectStaement);
        await db.close();

        return selected;
    }
    public static async run(statement: string, dbFileName: string): Promise<{ count: number }|undefined> {
        const db = await DB.createDBConnectionReadWrite(dbFileName);
        await db.run(statement);
        const result = await db.get<{ count: number }>(statement);
        await db.close();
        return result;
    }
}
export interface Account{
    id  : number;
    userName: string;
    email: string;
    password: string;
    picture: string;
}