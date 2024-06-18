import { AccountRepository } from '../src/repos/accountRepository';
import { Account } from '../src/model';
import * as path from 'path';
import { Database, open } from 'sqlite';
import { Database as SQLiteDatabase } from 'sqlite3';

const dbPath = path.resolve(__dirname, '../testData/test.sqlite');

beforeAll(async () => {
    const db = await open({
        filename: dbPath,
        driver: SQLiteDatabase
    });

    // Initialize the database with test data
    await db.exec(`CREATE TABLE IF NOT EXISTS accounts (
        userName TEXT PRIMARY KEY,
        email TEXT,
        password TEXT,
        picture TEXT,
        SEWAccessToken TEXT
    )`);

    await db.exec(`INSERT INTO accounts (userName, email, password, picture, SEWAccessToken) VALUES
        ('testUser', 'test@example.com', 'password123', 'testPic', 'testToken')
    `);

    await db.close();
});

afterAll(async () => {
    const db = await open({
        filename: dbPath,
        driver: SQLiteDatabase
    });

    // Clean up database
    await db.exec(`DROP TABLE accounts`);
    await db.close();
});

describe('AccountRepository', () => {
    let repo: AccountRepository;

    beforeEach(() => {
        repo = new AccountRepository(dbPath);
    });

    test('should get account by username', async () => {
        const account = await repo.getAccountByUsername('testUser');
        expect(account).toEqual({
            userName: 'testUser',
            email: 'test@example.com',
            password: 'password123',
            picture: 'testPic',
            SEWAccessToken: 'testToken'
        });
    });

    test('should return undefined for non-existent username', async () => {
        const account = await repo.getAccountByUsername('nonExistentUser');
        expect(account).toBeUndefined();
    });

    test('should add a new account', async () => {
        const newAccount: Account = {
            userName: 'newUser',
            email: 'new@example.com',
            password: 'newPassword',
            picture: 'newPic',
            SEWAccessToken: null
        };
        const result = await repo.addAccount(newAccount);
        expect(result).toBe(true);

        const addedAccount = await repo.getAccountByUsername('newUser');
        expect(addedAccount).toEqual(newAccount);
    });

    test('should not add an existing account', async () => {
        const existingAccount: Account = {
            userName: 'testUser',
            email: 'test@example.com',
            password: 'password123',
            picture: 'testPic',
            SEWAccessToken: null
        };
        const result = await repo.addAccount(existingAccount);
        expect(result).toBe(false);
    });

    test('should update SEWAccessToken for an existing account', async () => {
        const result = await repo.updateSEWAccessToken('newToken', 'testUser');
        expect(result).toBe(true);

        const account = await repo.getAccountByUsername('testUser');
        expect(account?.SEWAccessToken).toBe('newToken');
    });

    test('should not update SEWAccessToken for a non-existent account', async () => {
        const result = await repo.updateSEWAccessToken('newToken', 'nonExistentUser');
        expect(result).toBe(false);
    });

    test('should update picture for an existing account', async () => {
        const result = await repo.updatePicture('newPic', 'testUser');
        expect(result).toBe(true);

        const account = await repo.getAccountByUsername('testUser');
        expect(account?.picture).toBe('newPic');
    });

    test('should not update picture for a non-existent account', async () => {
        const result = await repo.updatePicture('newPic', 'nonExistentUser');
        expect(result).toBe(false);
    });

    test('should delete an account by username', async () => {
        const result = await repo.deleteAccountByUsername('testUser');
        expect(result).toBe(true);

        const account = await repo.getAccountByUsername('testUser');
        expect(account).toBeUndefined();
    });

    test('should return true when deleting a non-existent account', async () => {
        const result = await repo.deleteAccountByUsername('nonExistentUser');
        expect(result).toBe(true);
    });
});