import multer from 'multer';
import path from "path";

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Create the multer instance
export const multerConf = multer({ storage: storage });

// Set up storage for uploaded files
const pictureStorage = multer.diskStorage({
    destination: (_, file, cb) => {

        cb(null, path.join(__dirname, '../../../build/temp/'));
        console.log("in destination of multer: " + file.originalname);
    },
    filename: (_, file, cb) => {

        const filename = `${path.extname(file.originalname)}`;//`${name.replace(/\s+/g, '_')}_pfp.${path.extname(file.originalname)}`; // muss denk ich fürs konvertieren den ext-namen haben
        cb(null, filename);
        console.log("in filename of multer: " + filename);

    }
});

export const multerConfPicture = multer(
    {
        storage: storage,
        fileFilter(req, file: Express.Multer.File, callback: multer.FileFilterCallback) {
            console.log("check file", file);
            console.log("checking request: " + req);
            const checkMimeType = file.mimetype.includes("image/")
            console.log("checkMimeType", checkMimeType);
            if (checkMimeType) {
                return callback(null, true)

            } else {
                callback(new Error(": Failed to convert the image to WebP format."));
            }
        }
    });
