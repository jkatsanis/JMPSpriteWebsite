import React, { useRef, useState } from "react";
import { Page } from "../page";
import "./projects.css"; // Stil-Datei importieren

const ProjectsDisplay: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);

    interface Project {
        name: string;
        description: string;
        file: File | null;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const projectName = nameRef.current?.value || "";
        const projectDescription = descriptionRef.current?.value || "";
        const projectFile = fileRef.current?.files?.[0] || null;

        if (projectName && projectDescription && projectFile) {
            const newProject: Project = {
                name: projectName,
                description: projectDescription,
                file: projectFile
            };
            setProjects([...projects, newProject]);
            if (nameRef.current) nameRef.current.value = "";
            if (descriptionRef.current) descriptionRef.current.value = "";
            if (fileRef.current) fileRef.current.value = "";
        }
    };

    return (
        <Page>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        ref={nameRef}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        ref={descriptionRef}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file">Upload ZIP file:</label>
                    <input
                        type="file"
                        id="file"
                        accept=".zip"
                        ref={fileRef}
                        required
                    />
                </div>
                <button type="submit" className="btn">Upload</button>
            </form>
            <h2>Uploaded Projects</h2>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {project.name},{" "}
                        <strong>Description:</strong> {project.description},{" "}
                        <strong>File:</strong> {project.file?.name}
                    </li>
                ))}
            </ul>
        </Page>
    );
};

export default ProjectsDisplay;
