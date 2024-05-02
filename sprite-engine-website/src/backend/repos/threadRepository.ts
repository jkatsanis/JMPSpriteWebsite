import {Account, DB, ThreadComment, Thread} from "../model";

export class ThreadRepository {
    private dbPathThreads: string;
    private dbPathComments: string;
    constructor(dbPathThreads: string, dbPathComments : string) {
        this.dbPathThreads = dbPathThreads;
        this.dbPathComments = dbPathComments;
    }

    public async getAllThreads() : Promise<Thread[] | undefined>{
        return await DB.selectAll("SELECT * FROM threads", this.dbPathThreads)
    }
    public async getAllComments(): Promise<ThreadComment[] | undefined>{
        return await DB.selectAll("SELECT * FROM comments", this.dbPathComments);
    }
    public async getAllThreadsByUsername(username : string) : Promise<Thread[] | undefined>{
        return await DB.selectAll(`SELECT * FROM threads WHERE author = '${username}'`, this.dbPathThreads)
    }
    public async getAllCommentsByUsername(username : string) : Promise<ThreadComment[] | undefined>{
        return await DB.selectAll(`SELECT * FROM comments WHERE author = '${username}'`, this.dbPathComments)
    }
    public async getThreadById(threadId: number): Promise<Thread | undefined> {
        return await DB.select(`SELECT * FROM threads WHERE id = '${threadId}'`, this.dbPathThreads)
    }
    public async getCommentById(CommentId: number): Promise<ThreadComment | undefined> {
        return await DB.select(`SELECT * FROM comments WHERE id = '${CommentId}'`, this.dbPathComments)
    }
    public async getCommentsFromThread(threadId: number) : Promise<ThreadComment[] | undefined> {
        return await DB.selectAll(`SELECT * FROM comments WHERE threadId = '${threadId}'`, this.dbPathComments)
    }

    public async deleteThreadsAndCommentsByUsername(username: string): Promise<boolean> {
        let threads = await this.getAllThreadsByUsername(username);
        let comments = await this.getAllCommentsByUsername(username);

        if (threads === undefined && comments === undefined){
            return false;
        }

        if (threads !== undefined){
            for (let thread of threads){
                await this.deleteThreadById(thread.id);
            }
        }
        if (comments !== undefined){
            for (let comment of comments){
                await this.deleteCommentById(comment.id);
            }
        }
        return true;
    }
    public async deleteThreadById(id: number): Promise<boolean> {
        if (await this.getThreadById(id) === undefined){
            return false;
        }
        let childComments = await this.getCommentsFromThread(id);
        if (childComments === undefined){
            return true;
        }
        for(let childComment of childComments){
            await this.deleteCommentById(childComment.id);
        }
        await this.deleteSingleThreadById(id);
        return true;
    }

    private async deleteSingleCommentById(id: number){
        await DB.run(`DELETE FROM comments WHERE id = '${id}'`, this.dbPathComments);
    }
    private async deleteSingleThreadById(id: number){
        await DB.run(`DELETE FROM threads WHERE id = '${id}'`, this.dbPathThreads);
    }
    public async deleteCommentById(id: number): Promise<boolean> {
        if (await this.getCommentById(id) === undefined){
            return false;
        }
        let childComments = await this.getCommentsFromParent(id);

        if (childComments === undefined || childComments.length === 0){
            await this.deleteSingleCommentById(id);
            return true;
        }
        for (let childComment of childComments){
            await this.deleteCommentById(childComment.id);
        }
        await this.deleteSingleCommentById(id);
        return true
    }
    public async getCommentsFromParent(parentId: number) : Promise<ThreadComment[] | undefined>{
        return await DB.selectAll(`SELECT * FROM comments WHERE parentCommentId = '${parentId}'`, this.dbPathComments);
    }
    public async addThread(thread: Thread): Promise<boolean> {
        if (await this.getThreadById(thread.id) !== undefined){
            return false;
        }
        const insertStatement = `
        INSERT INTO threads (id, labels, title, author, content) 
        VALUES ('${thread.id}', '${thread.labels}', '${thread.title}', '${thread.author}', '${thread.content}')
        `;
        await DB.run(insertStatement, this.dbPathThreads);
        return true;
    }
    public async updateThread(thread: Thread): Promise<boolean> {
        if (await this.getThreadById(thread.id) === undefined) {return false;}
        const insertStatement = `
        REPLACE INTO threads (id, labels, title, author, content) 
        VALUES ('${thread.id}', '${thread.labels}', '${thread.title}', '${thread.author}', '${thread.content}')
        `;
        await DB.run(insertStatement, this.dbPathThreads);
        return true;
    }
    public async addComment(comment: ThreadComment): Promise<boolean> {
        if (await this.getCommentById(comment.id) !== undefined || await this.getThreadById(comment.threadId) === undefined){
            return false;
        }
        if (comment.parentCommentId !== null){
            if (await this.getCommentById(comment.parentCommentId) === undefined){
                return false;
            }
        }

        const insertStatement = `
        INSERT INTO comments (id, threadId, parentCommentId, author, content) 
        VALUES ('${comment.id}', '${comment.threadId}', '${comment.parentCommentId}', '${comment.author}', '${comment.content}')
        `;
        await DB.run(insertStatement, this.dbPathComments);
        return true;
    }
    public async updateComment(comment: ThreadComment): Promise<boolean> {
        if (await this.getCommentById(comment.id) === undefined || await this.getThreadById(comment.threadId) === undefined){
            return false;
        }
        if (comment.parentCommentId !== null){
            if (await this.getCommentById(comment.parentCommentId) === undefined){
                return false;
            }
        }
        const insertStatement = `
        REPLACE INTO comments (id, threadId, parentCommentId, author, content) 
        VALUES ('${comment.id}', '${comment.threadId}', '${comment.parentCommentId}', '${comment.author}', '${comment.content}')
        `;
        await DB.run(insertStatement, this.dbPathComments);
        return true;
    }
}
