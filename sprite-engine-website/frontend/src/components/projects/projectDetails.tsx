import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../../macros";
import IconText from "components/icon/icontext";
import { accountRepo } from "components/threads/logic/account-repository";
import { Account } from "components/threads/logic/model";
import { Project } from "./models";
import { fetchProject } from "./models";

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
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
        fetchProject(id, setProject, setIsLoading);
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
            <IconText iconPath={project.picture} text={project.owner}/>
            <h1>Title: {project.title}</h1>
            <p className="formi-control">{project.description}</p>
            <button onClick={() => handleDownload(project.filename)} className="default-btn">Download File</button>
            </div>
        </div>
    );
};

export default ProjectDetails;
