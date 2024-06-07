import React, { useRef, useState } from "react";
import { Page } from "../page";
import "./projects.css"; // Stil-Datei importieren
import { URL } from "../../macros";

interface Project {
    name: string;
    description: string;
    file: File | null;
}

const ProjectsDisplay: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [filename, setFilename] = useState("");

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

    const handleDownload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${URL}/api/projects/${filename}`);
            if (!response.ok) {
                throw new Error('File not found');
            }
            // Convert response to blob and create a download link
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Set the file name for download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:');
            // Handle error (e.g., display error message to user)
        }
    };

    let uploadURL = `${URL}/api/projects/upload`;

    return (
        <Page>
            <h1>File Upload</h1>
            <form action={uploadURL} method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input type="file" name="file" ref={fileRef} required />
                <button type="submit">Upload</button>
            </form>

            <form onSubmit={handleDownload}>
                <input type="text" name="filename" required onChange={(e) => setFilename(e.target.value)} />
                <button type="submit">Download</button>
            </form>
        </Page>
    );
};

export default ProjectsDisplay;
