import express from "express";
import multer from "multer";
import fs from "fs";
import {multerConf} from "../multerUpload";
import * as path from "path";
import {ProjectRepository} from "../repos/projectRepository";
import {Project} from "../model";
export const projectRouter = express.Router();
const projectRepo = new ProjectRepository("../backend/data/projects.sqlite");

projectRouter.use(multerConf.single('file'))
// Set up a route for file uploads
projectRouter.post('/upload', (req, res) => {
    // Handle the uploaded file
    console.log("upload");
    const newProject: Project = {
        id: 3, // Replace with your own logic to generate a unique ID
        owner: 'sauger', // Replace with your own logic to get the authenticated user's username
        title: req.body.title,
        description: req.body.description,
        filename: req.file!.filename
    };
    projectRepo.insertProject(newProject);
    //res.json({ message: 'File uploaded successfully!' });
});

projectRouter.get('/', async (req, res) => {
    const projects = await projectRepo.getAllProjects();
    console.log(projects);
    res.json(projects);
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