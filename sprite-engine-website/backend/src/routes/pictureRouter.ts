import Router from "express"
import {ThreadRepository} from "../repos/threadRepository";
import {Picture, StatusCodes, Thread, ThreadComment} from "../model";
import {accountRepo, accountRouter} from "./accountRouter";
import {multerConf, multerConfPicture} from "../multerUpload";
import path from "path";
import fs from "fs";
import {projectRouter} from "./projectRouter";
import config from "../config";
import {threadRepo} from "./threadRouter";

export const avatarRouter = Router();

export const publicPath = path.join(__dirname, '../../public/')

export const getUserPath = (username: string) => {
    return path.join(publicPath,`${username}/`);
}
export const getThreadPicturePath = () => {
    return path.join(publicPath,`/threads/`);
}

avatarRouter.put("/:threadId/picture", multerConfPicture.single('picture'), async (req, res) => {
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
    const pictureDir = threadPath + req.file.filename;
    fs.renameSync(req.file.path, pictureDir ); //copy from temp dir to avatar path
    const imagePath = await convertToWebp(pictureDir, true, threadId);

    if (!imagePath) {
        res.sendStatus(StatusCodes.BAD_REQUEST); // TODO: should test this
        return;
    }

    //TODO post picture into database
    await accountRepo.updatePicture(config.address + "/threads/" + threadId + ".webp", threadId);

    res.json(thread);
})

export async function convertToWebp(file: string, deleteOld: boolean,outName:string|null = null): Promise<string | null> {

    const bp = 10;
    const webp = require('webp-converter');
    const newFile =  outName ? `${path.dirname(file)}/${outName}.webp` : `${removeLast(file, ".")}.webp`;
    await webp.cwebp(file, `${newFile}`, "-q 80"); // TODO: switched to webp.cwebp(), but result equals "".
    const result = fs.existsSync(newFile);

    if(result){
        if (deleteOld) {
            await fs.unlinkSync(file)
        }
        return newFile;
    } else {
        console.error(`Failed to convert file ${file} to WebP: ${result}`);
        return null;
    }
}

export function removeLast(str:string, substring:string) {
    const index = str.lastIndexOf(substring);
    if (index === -1) {
        // The substring was not found in the string
        return str;
    }
    return str.slice(0, index);
}