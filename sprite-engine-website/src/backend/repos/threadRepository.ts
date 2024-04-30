import {Account, DB, ThreadComment, Thread} from "../model";

export class threadRepository {
    private dbPathThreads: string;
    private dbPathComments: string;
    constructor(dbPathThreads: string, dbPathComments : string) {
        this.dbPathThreads = dbPathThreads;
        this.dbPathComments = dbPathComments;
    }

    public async getThreadsByAuthor(username: string): Promise<Account|undefined>{
        return await DB.selectAll(`SELECT * FROM threads WHERE userName = '${username}'`, this.dbPathThreads);
    }

    public async getAllThreads() {
        return await DB.selectAll("SELECT * FROM threads", this.dbPathThreads)
    }
    public async getAllThreadsByUsername(username : string) {
        return await DB.selectAll(`SELECT * FROM threads WHERE author = '${username}'`, this.dbPathThreads)
    }
    public async getAllCommentsByUsername(username : string) {
        return await DB.selectAll(`SELECT * FROM comments WHERE author = '${username}'`, this.dbPathComments)
    }
    public async getThreadById(threadId: number) {
        return await DB.select(`SELECT * FROM threads WHERE id = '${threadId}'`, this.dbPathThreads)
    }
    public async getCommentById(CommentId: number) {
        return await DB.select(`SELECT * FROM comments WHERE id = '${CommentId}'`, this.dbPathComments)
    }
    public async getCommentsFromThread(threadId: number) {
        return await DB.selectAll(`SELECT * FROM comments WHERE threadId = '${threadId}'`, this.dbPathComments)
    }


    public async deleteThreadsAndCommentsByUsername(username: string): Promise<void> {
        let threads = await this.getAllThreadsByUsername(username);
        let comments = await this.getAllCommentsByUsername(username);
        for (let thread of threads){
            await this.deleteThreadById(thread.id);
        }
        for (let comment of comments){
            await this.deleteCommentById(comment.id);
        }
    }
    public async deleteThreadById(id: number): Promise<void> {
        let childComments : ThreadComment[] = await this.getCommentsFromThread(id);
        for(let childComment of childComments){
            await this.deleteCommentById(childComment.id);
        }
    }
    public async getAllComments(){
        return await DB.selectAll("SELECT * FROM comments", this.dbPathComments);
    }
    private async deleteSingleCommentById(id: number){
        await DB.run(`DELETE FROM comments WHERE id = '${id}'`, this.dbPathComments);
    }
    public async deleteCommentById(id: number): Promise<void> {
        let childComments : ThreadComment[] = await this.getCommentsByParent(id);

        if (childComments.length != 0){
            for (let childComment of childComments){
                await this.deleteCommentById(childComment.id);
            }
        }
        await this.deleteSingleCommentById(id);
    }
    public async getCommentsByParent(parentId: number){
        return await DB.selectAll(`SELECT * FROM comments WHERE parentId = '${parentId}'`, this.dbPathComments);
    }

}
