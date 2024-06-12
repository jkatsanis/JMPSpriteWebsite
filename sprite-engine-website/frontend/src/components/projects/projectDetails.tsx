import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../macros";

interface Project {
    id: number;
    owner: string;
    title: string;
    description: string;
    filename: string;
}

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProject = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${URL}/api/projects/byID/${id}`);
            if (!response.ok) {
                throw new Error('Error fetching project');
            }
            const data: Project = await response.json();
            setProject(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching project:', error);
            setIsLoading(false);
        }
    };

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

    useEffect(() => {
        fetchProject();
    }, [id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!project) {
        return <p>Project not found</p>;
    }

    return (
        <div className="container">
            <div className="project">
            <h1>Title: {project.title}</h1>
            <h3>Owner: {project.owner}</h3>
            <p className="formi-control">{project.description}</p>
            <button onClick={() => handleDownload(project.filename)} className="default-btn">Download File</button>
            </div>
        </div>
    );
};

export default ProjectDetails;
