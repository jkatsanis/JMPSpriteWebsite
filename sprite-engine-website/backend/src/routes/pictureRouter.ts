import Router from "express"
import {ThreadRepository} from "../repos/threadRepository";
import {DB, Picture, StatusCodes, Thread, ThreadComment} from "../model";
import {accountRepo, accountRouter} from "./accountRouter";
import {multerConf, multerConfPicture} from "../multerUpload";
import path from "path";
import fs from "fs";
import {projectRouter} from "./projectRouter";
import config from "../config";
import {threadRepo} from "./threadRouter";
import {convertToWebp} from "./avatarRouter";
import {v4 as uuidv4} from 'uuid';

export const pictureRouter = Router();

const dbPath = "./data/accounts.sqlite"
export const publicPath = path.join(__dirname, '../../public/')

export const getUserPath = (username: string) => {
    return path.join(publicPath,`${username}/`);
}
export const getThreadPicturePath = () => {
    return path.join(publicPath,`/threads/`);
}

pictureRouter.put("/:threadId", multerConfPicture.single('picture'), async (req, res) => {
    const threadId = req.params.threadId;

    //const profilePic = req.body.profilePic ? user!.profilePic : '../public/avatars/Default_pfp.jpg'; // TODO: im service pfp lösen

    const thread = await threadRepo.getThreadById(parseInt(threadId));
    if(!thread){
        res.sendStatus(StatusCodes.NOT_FOUND);
        if (req.file)
            await fs.unlinkSync(req.file.path);
        return;
    }
    if (!req.file) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return;
    }
    fs.mkdirSync(getThreadPicturePath(), {recursive: true});
    fs.mkdirSync(getThreadPicturePath() + "/"+ threadId);
    const threadPath = getThreadPicturePath() + "/"+ threadId + "/";
    const uuid = uuidv4();
    const pictureDir = threadPath + uuid;
    fs.renameSync(req.file.path, pictureDir ); //copy from temp dir to avatar path
    const imagePath = await convertToWebp(pictureDir, true);

    if (!imagePath) {
        res.sendStatus(StatusCodes.BAD_REQUEST); // TODO: should test this
        return;
    }

    const insertString  = `INSERT INTO pictures values('${uuid}', '${threadId}', '${imagePath}')`;

    await DB.run(insertString, dbPath);

    res.json(imagePath);
});

