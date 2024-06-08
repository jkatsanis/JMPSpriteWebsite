import React, {useEffect, useRef, useState} from "react";
import { Page } from "../page";
import "./projects.css"; // Stil-Datei importieren
import { URL } from "../../macros";
import * as punycode from "punycode";
import {ReactJSXElementAttributesProperty} from "@emotion/react/types/jsx-namespace";
//import {ProjectRepository} from "../../../../backend/src/repos/projectRepository";

interface Project {
    id: number;
    owner: string;
    title: string;
    description: string;
}

const ProjectsDisplay: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState("");
    const titleRef = useRef<HTMLInputElement>(null);

    const fetchProjects = async () => {
        try {
            const response = await fetch(`${URL}/api/projects`);
            if (!response.ok) {
                throw new Error('Error fetching projects');
            }
            const data = await response.json();
            setProject(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    const [projects, setProject] = useState([] as Project[]);
    //projects = [{id: 1, owner: 'admin', title: 'saug', description: 'oger'}];
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects().then(() => console.log(projects)).then(() => setIsLoading(false));
    }, []);
    //console.log(projects);
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

    const handleDownload2 = async (projectId: number) => {
        try {
            const response = await fetch(`${URL}/api/projects/${projectId}`);
            if (!response.ok) {
                throw new Error('File not found');
            }
            // Convert response to blob and create a download link
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `project_${projectId}`; // Set the file name for download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
            // Handle error (e.g., display error message to user)
        }
    };
    const onSub = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Verhindert das Standardverhalten des Formulars
        //let repo = new ProjectRepository("../../../../backend/data/projects.sqlite");
        if (fileRef.current?.files?.length) {
            const file = fileRef.current.files[0];
            const title = titleRef.current?.value;
            const description = descriptionRef.current?.value;
            const pro = {name: title || '', description: description || '', file: file};

            const formData = new FormData();
            formData.append('title', title || '');
            formData.append('description', description || '');

            //await repo.insertProject({id: 1, description: description || '', owner: 'admin', title: title || ''});

            try {
                const response = await fetch(uploadURL, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Error uploading file');
                }

                // Handle successful upload (e.g., update state, display success message)
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error (e.g., display error message to user)
            }
        }
    };

    let uploadURL = `${URL}/api/projects/upload`;

    return (
        <Page>
            <h1>File Upload</h1>
            <form action={uploadURL} method="POST" encType="multipart/form-data">
                <input type="file" name="file" ref={fileRef} required />
                <input type="text" name="title" ref={titleRef}/>
                <input type="text" name="description" ref={descriptionRef}/>
                <button type="submit">Upload</button>
            </form>

            <form onSubmit={handleDownload}>
                <input type="text" name="filename" required onChange={(e) => setFilename(e.target.value)} />
                <button type="submit">Download</button>
            </form>
            //TODO: Display all projects
            <h1>Projects</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                projects.map((project) => (
                    <div key={project.id}>
                        <h2>{project.title}</h2>
                        <a>{project.description}</a>
                        <button onClick={() => handleDownload2(project.id)}>Download</button>
                    </div>
                ))
            )}


        </Page>
    );
};

export default ProjectsDisplay;
