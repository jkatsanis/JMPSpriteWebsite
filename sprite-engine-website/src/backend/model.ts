import {Database, open} from "sqlite";
import {Database as Driver, OPEN_READONLY, OPEN_READWRITE} from "sqlite3";

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

    public static async selectAll(selectStatement: string, dbFileName: string): Promise<any> {
        const db = await DB.createDBConnectionReadOnly(dbFileName);
        const selected : any[] = await db.all<any[]>(selectStatement);
        await db.close();

        return selected;
    }
    public static async select(selectStatement: string, dbFileName: string): Promise<any> {
        const db = await DB.createDBConnectionReadOnly(dbFileName);
        const selected : any = await db.get<any>(selectStatement);
        await db.close();

        return selected;
    }
    public static async run(statement: string, dbFileName: string): Promise<void>{
        const db = await DB.createDBConnectionReadWrite(dbFileName);
        await db.run(statement);
        await db.close();
        return;
    }
}
export const StatusCodes = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404
};
export interface Account{
    userName: string;
    email: string;
    password: string;
    picture: string;
}
export interface ThreadComment {
    id: number;
    threadId: number;
    parentCommentId: number;
    author: string;
    content: string;
}
export interface Thread{
    id: number;
    labels: string;
    title: string
    author: string;
    content: string;
}