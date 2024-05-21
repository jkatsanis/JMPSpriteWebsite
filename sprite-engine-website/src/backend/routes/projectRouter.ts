import express from "express";
import multer from "multer";
import fs from "fs";
import {multerConf} from "../multerUpload";
import * as path from "path";
export const projectRouter = express.Router();

projectRouter.use(multerConf.single('file'))
// Set up a route for file uploads
projectRouter.post('/upload', (req, res) => {
    // Handle the uploaded file
    res.json({ message: 'File uploaded successfully!' });
});

projectRouter.get('/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join('uploads/', filename);
    console.log(filePath);
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'File not found' });
        }
        // Send the file
        res.download(filePath, (err) => {
            if (err) {
                res.status(500).json({ message: 'Error downloading the file' });
            }
        });
    });
});