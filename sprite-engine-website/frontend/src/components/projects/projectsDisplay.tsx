import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Page } from "../page";
import "./projects.css";
import { URL } from "../../macros";
import ProjectCreation from './projectCreation';
import ProjectDetails from './projectDetails';

interface Project {
    id: number;
    owner: string;
    title: string;
    description: string;
    filename: string;
}

const ProjectsDisplay: React.FC = () => {
    const [projects, setProject] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${URL}/api/projects`);
            if (!response.ok) {
                throw new Error('Error fetching projects');
            }
            const data: Project[] = await response.json();
            setProject(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDownload = async (filename: string) => {
        try {
            const response = await fetch(`${URL}/api/projects/${filename}`);
            if (!response.ok) {
                throw new Error('File not found');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `project_${filename}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <Page>
            <div className="container">
            <h1>File Upload</h1>
            <Link to="/create">
                <button className="default-btn">Add Project</button>
            </Link>
            <h1>Projects</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                projects.map((project) => (
                    <div key={project.id} className="project">
                        <h6>{project.owner}</h6>
                        <h5>{project.title}</h5>
                        <p>{project.description}</p>
                        <button onClick={() => handleDownload(project.filename)} className="default-btn">Download</button>
                        <Link to={`/project/${project.id}`}>
                            <button className="default-btn">View Project</button>
                        </Link>
                    </div>
                ))
            )}
            </div>
        </Page>
    );
};

export default ProjectsDisplay;
