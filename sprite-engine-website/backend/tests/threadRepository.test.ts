import { ThreadRepository } from '../src/repos/threadRepository';
import { Thread, ThreadComment } from '../src/model';
import * as path from 'path';
import { Database, open } from 'sqlite';
import { Database as SQLiteDatabase } from 'sqlite3';

const dbPathThreads = path.resolve(__dirname, '../testData/test_threads.sqlite');
const dbPathComments = path.resolve(__dirname, '../testData/test_comments.sqlite');

beforeAll(async () => {
    const dbThreads = await open({
        filename: dbPathThreads,
        driver: SQLiteDatabase
    });

    const dbComments = await open({
        filename: dbPathComments,
        driver: SQLiteDatabase
    });

    // Initialize the threads database with test data
    await dbThreads.exec(`CREATE TABLE IF NOT EXISTS threads (
        id INTEGER PRIMARY KEY,
        labels TEXT,
        title TEXT,
        author TEXT,
        content TEXT
    )`);

    await dbThreads.exec(`INSERT INTO threads (id, labels, title, author, content) VALUES
        (1, 'label1', 'Thread 1', 'testUser', 'Content of thread 1'),
        (2, 'label2', 'Thread 2', 'anotherUser', 'Content of thread 2')
    `);

    // Initialize the comments database with test data
    await dbComments.exec(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY,
        threadId INTEGER,
        parentCommentId INTEGER,
        author TEXT,
        content TEXT
    )`);

    await dbComments.exec(`INSERT INTO comments (id, threadId, parentCommentId, author, content) VALUES
        (1, 1, NULL, 'testUser', 'Comment 1 on thread 1'),
        (2, 1, 1, 'anotherUser', 'Reply to comment 1 on thread 1')
    `);

    await dbThreads.close();
    await dbComments.close();
});

afterAll(async () => {
    const dbThreads = await open({
        filename: dbPathThreads,
        driver: SQLiteDatabase
    });

    const dbComments = await open({
        filename: dbPathComments,
        driver: SQLiteDatabase
    });

    // Clean up databases
    await dbThreads.exec(`DROP TABLE  threads`);
    await dbComments.exec(`DROP TABLE comments`);

    await dbThreads.close();
    await dbComments.close();
});

describe('ThreadRepository', () => {
    let repo: ThreadRepository;   beforeEach(() => {
        repo = new ThreadRepository(dbPathThreads, dbPathComments);
    });

    test('should get all threads', async () => {
        const threads = await repo.getAllThreads();
        expect(threads).toEqual([
            { id: 1, labels: 'label1', title: 'Thread 1', author: 'testUser', content: 'Content of thread 1' },
            { id: 2, labels: 'label2', title: 'Thread 2', author: 'anotherUser', content: 'Content of thread 2' }
        ]);
    });

    test('should get all comments', async () => {
        const comments = await repo.getAllComments();
        expect(comments).toEqual([
            { id: 1, threadId: 1, parentCommentId: null, author: 'testUser', content: 'Comment 1 on thread 1' },
            { id: 2, threadId: 1, parentCommentId: 1, author: 'anotherUser', content: 'Reply to comment 1 on thread 1' }
        ]);
    });

    test('should get all threads by username', async () => {
        const threads = await repo.getAllThreadsByUsername('testUser');
        expect(threads).toEqual([
            { id: 1, labels: 'label1', title: 'Thread 1', author: 'testUser', content: 'Content of thread 1' }
        ]);
    });

    test('should get all comments by username', async () => {
        const comments = await repo.getAllCommentsByUsername('testUser');
        expect(comments).toEqual([
            { id: 1, threadId: 1, parentCommentId: null, author: 'testUser', content: 'Comment 1 on thread 1' }
        ]);
    });

    test('should get thread by id', async () => {
        const thread = await repo.getThreadById(1);
        expect(thread).toEqual({ id: 1, labels: 'label1', title: 'Thread 1', author: 'testUser', content: 'Content of thread 1' });
    });

    test('should get comment by id', async () => {
        const comment = await repo.getCommentById(1);
        expect(comment).toEqual({ id: 1, threadId: 1, parentCommentId: null, author: 'testUser', content: 'Comment 1 on thread 1' });
    });       test('should get comments from thread', async () => {
        const comments = await repo.getCommentsFromThread(1);
        expect(comments).toEqual([
            { id: 1, threadId: 1, parentCommentId: null, author: 'testUser', content: 'Comment 1 on thread 1' },
            { id: 2, threadId: 1, parentCommentId: 1, author: 'anotherUser', content: 'Reply to comment 1 on thread 1' }
        ]);
    });

    test('should add a new thread', async () => {
        const newThread: Thread = { id: 3, labels: 'label3', title: 'Thread 3', author: 'newUser', content: 'Content of thread 3' };
        const result = await repo.addThread(newThread);
        expect(result).toBe(true);

        const addedThread = await repo.getThreadById(3);
        expect(addedThread).toEqual(newThread);
    });

    test('should not add an existing thread', async () => {
        const existingThread: Thread = { id: 1, labels: 'label1', title: 'Thread 1', author: 'testUser', content: 'Content of thread 1' };
        const result = await repo.addThread(existingThread);
        expect(result).toBe(false);
    });

    test('should update a thread', async () => {
        const updatedThread: Thread = { id: 1, labels: 'newLabel', title: 'Updated Thread 1', author: 'testUser', content: 'Updated content' };
        const result = await repo.updateThread(updatedThread);
        expect(result).toBe(true);

        const thread = await repo.getThreadById(1);
        expect(thread).toEqual(updatedThread);
    });

    test('should delete a thread by id', async () => {
        const result = await repo.deleteThreadById(1);
        expect(result).toBe(true);

        const thread = await repo.getThreadById(1);
        expect(thread).toBeUndefined();
    });

    test('should add a new comment', async () => {
        const newComment: ThreadComment = { id: 3, threadId: 1, parentCommentId: null, author: 'newUser', content: 'New comment' };
        const result = await repo.addComment(newComment);
        expect(result).toBe(true);

        const addedComment = await repo.getCommentById(3);
        expect(addedComment).toEqual(newComment);
    });

    test('should not add an existing comment', async () => {
        const existingComment: ThreadComment = { id: 1, threadId: 1, parentCommentId: null, author: 'testUser', content: 'Comment 1 on thread 1' };
        const result = await repo.addComment(existingComment);
        expect(result).toBe(false);
    });

    test('should update a comment', async () => {
        const updatedComment: ThreadComment = { id: 1, threadId: 1, parentCommentId: null, author: 'testUser', content: 'Updated comment' };
        const result = await repo.updateComment(updatedComment);
        expect(result).toBe(true);

        const comment = await repo.getCommentById(1);
        expect(comment).toEqual(updatedComment);
    });

    test('should delete a comment by id', async () => {
        const result = await repo.deleteCommentById(1);
        expect(result).toBe(true);

        const comment = await repo.getCommentById(1);
        expect(comment).toBeUndefined();
    });

    test('should get comments from parent comment', async () => {
        const comments = await repo.getCommentsFromParent(1);
        expect(comments).toEqual([{ id: 2, threadId: 1, parentCommentId: 1, author: 'anotherUser', content: 'Reply to comment 1 on thread 1' }]);
    });

    test('should delete threads and comments by username', async () => {
        const result = await repo.deleteThreadsAndCommentsByUsername('testUser');
        expect(result).toBe(true);

        const threads = await repo.getAllThreadsByUsername('testUser');
        expect(threads).toEqual([]);

        const comments = await repo.getAllCommentsByUsername('testUser');
        expect(comments).toEqual([]);
    });
});