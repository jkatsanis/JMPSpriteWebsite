import Router from "express"
import {ThreadRepository} from "../repos/threadRepository";
import {StatusCodes, Thread, ThreadComment} from "../model";
import {accountRepo, accountRouter} from "./accountRouter";

export const threadRouter = Router();

export const threadRepo = new ThreadRepository("data/threads.sqlite", "data/comments.sqlite");

threadRouter.get("/threads", async (req, res) => {
    res.status(StatusCodes.OK);
    res.send(await threadRepo.getAllThreads());
});
threadRouter.get("/comments", async (req, res) => {
    res.status(StatusCodes.OK);
    res.send(await threadRepo.getAllComments());
});
threadRouter.get("/comments/:username", async (req, res) => {
    let username = req.params.username;
    if (await accountRepo.getAccountByUsername(username) === undefined){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.status(StatusCodes.OK);
    res.send(await threadRepo.getAllCommentsByUsername(username));
});
threadRouter.get("/threads/:username", async (req, res) => {
    let username = req.params.username;
    if (await accountRepo.getAccountByUsername(username) === undefined){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.status(StatusCodes.OK);
    res.send(await threadRepo.getAllThreadsByUsername(username));
});
threadRouter.get("/thread/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    const thread = await threadRepo.getThreadById(id);
    if (thread === undefined){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.status(StatusCodes.OK);
    res.send(thread);
});
threadRouter.get("/comment/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    const thread = await threadRepo.getCommentById(id);
    if (thread === undefined){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.status(StatusCodes.OK);
    res.send(thread);
});
threadRouter.get("/comment/children/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    const comments = await threadRepo.getCommentsFromParent(id);
    if (comments === undefined || comments.length === 0){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.status(StatusCodes.OK);
    res.send(comments);
});
threadRouter.get("/thread/comments/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    if (isNaN(id)){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }

    const comments = await threadRepo.getCommentsFromThread(id);
    if (comments === undefined || comments.length === 0){
        res.sendStatus(StatusCodes.OK);
        return;
    }
    res.status(StatusCodes.OK);
    res.send(comments);
});
threadRouter.delete("/thread/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || !await threadRepo.deleteThreadById(id)){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.sendStatus(StatusCodes.OK);
    return;
});
threadRouter.delete("/comment/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || !await threadRepo.deleteCommentById(id)){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.sendStatus(StatusCodes.OK);
    return;
});
threadRouter.delete("/threads/comments/:username", async (req, res) => {
    const username = req.params.username;
    if (await threadRepo.deleteThreadsAndCommentsByUsername(username)){
        res.sendStatus(StatusCodes.NOT_FOUND);
        return;
    }
    res.sendStatus(StatusCodes.OK);
    return;
});
threadRouter.post("/thread", async (req, res) => {
    const id = req.body.id;
    const labels = req.body.labels;
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    if (id === null || title === null || author === null || content === null){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    if (!await threadRepo.addThread(new class implements Thread {
        author: string = author;
        content: string = content;
        id: number = id;
        labels: string = labels;
        title: string = title;

    })){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    res.sendStatus(StatusCodes.CREATED);
});
threadRouter.patch("/thread", async (req, res) => {
    const id = req.body.id;
    const labels = req.body.labels;
    const title = req.body.title;
    const author = req.body.author;
    const content = req.body.content;

    if (id === null || title === null || author === null || content === null){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    if (!await threadRepo.updateThread(new class implements Thread {
        author: string = author;
        content: string = content;
        id: number = id;
        labels: string = labels;
        title: string = title;

    })){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    res.sendStatus(StatusCodes.OK);
});
threadRouter.post("/comment", async (req, res) => {
    const id = req.body.id;
    const threadId = req.body.threadId;
    const parentCommentId = req.body.parentCommentId;
    const author = req.body.author;
    const content = req.body.content;

    if (id === null || threadId === null || author === null || content === null){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    if (!await threadRepo.addComment(new class implements ThreadComment {
        author: string = author;
        content: string = content;
        id: number = id;
        parentCommentId : number = parentCommentId;
        threadId: number = threadId;
    })){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    res.sendStatus(StatusCodes.CREATED);
});
threadRouter.patch("/comment", async (req, res) => {
    const id = req.body.id;
    const threadId = req.body.threadId;
    const parentCommentId = req.body.parentCommentId;
    const author = req.body.author;
    const content = req.body.content;

    if (id === null || threadId === null || author === null || content === null){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    if (!await threadRepo.updateComment(new class implements ThreadComment {
        author: string = author;
        content: string = content;
        id: number = id;
        parentCommentId : number = parentCommentId;
        threadId: number = threadId;
    })){
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    res.sendStatus(StatusCodes.OK);
});