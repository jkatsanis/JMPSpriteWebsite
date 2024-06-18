import { DB } from '../src/model'
import { Database } from 'sqlite3';

jest.mock('sqlite');

describe('DB class', () => {
    const dbFileName = 'testData/test.sqlite'; // Define constant for database filename

    describe('createDBConnectionReadOnly', () => {
        it('should open a read-only database connection', async () => {
            const db = await DB.createDBConnectionReadOnly(dbFileName) as unknown as jest.Mocked<Database>;
            expect(db.constructor).toBe(Database);
            expect(db.run).toHaveBeenCalledTimes(1);
            expect(db.run).toHaveBeenCalledWith('PRAGMA foreign_keys = ON');
            expect(db.close).toHaveBeenCalledTimes(1);
        });
    });

    describe('createDBConnectionReadWrite', () => {
        it('should open a read-write database connection', async () => {
            const db = await DB.createDBConnectionReadWrite(dbFileName) as unknown as jest.Mocked<Database>;
            expect(db.constructor).toBe(Database);
            expect(db.run).toHaveBeenCalledTimes(1);
            expect(db.run).toHaveBeenCalledWith('PRAGMA foreign_keys = ON');
            expect(db.close).toHaveBeenCalledTimes(1);
        });
    });

    describe('selectAll', () => {
        it('should select all records from the database', async () => {
            // Mocking selectAll query result
            const selectStatement = 'SELECT * FROM table';
            const selectedData = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }];
            const db = await DB.createDBConnectionReadOnly(dbFileName) as unknown as jest.Mocked<Database>;
            db.all.mockResolvedValue(selectedData);

            const result = await DB.selectAll(selectStatement, dbFileName);

            expect(result).toEqual(selectedData);
            expect(db.close).toHaveBeenCalledTimes(1);
        });
    });

    describe('select', () => {
        it('should select a single record from the database', async () => {
            // Mocking select query result
            const selectStatement = 'SELECT * FROM table WHERE id = 1';
            const selectedData = { id: 1, name: 'John' };
            const db = await DB.createDBConnectionReadOnly(dbFileName) as unknown as jest.Mocked<Database>;
            db.get.mockResolvedValue(selectedData);

            const result = await DB.select(selectStatement, dbFileName);

            expect(result).toEqual(selectedData);
            expect(db.close).toHaveBeenCalledTimes(1);
        });
    });

    describe('run', () => {
        it('should execute a statement in the database', async () => {
            const statement = 'CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)';
            const db = await DB.createDBConnectionReadWrite(dbFileName) as unknown as jest.Mocked<Database>;

            await DB.run(statement, dbFileName);

            expect(db.run).toHaveBeenCalledTimes(1);
            expect(db.run).toHaveBeenCalledWith(statement);
            expect(db.close).toHaveBeenCalledTimes(1);
        });
    });
});