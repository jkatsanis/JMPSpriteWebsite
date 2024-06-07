import React, { useRef, useState } from "react";
import { Page } from "../page";
import "./projects.css"; // Stil-Datei importieren
import { URL } from "../../macros";
import * as punycode from "punycode";
import {ReactJSXElementAttributesProperty} from "@emotion/react/types/jsx-namespace";

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
    const titleRef = useRef<HTMLInputElement>(null);
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

    const onSub = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Verhindert das Standardverhalten des Formulars

        if (fileRef.current?.files?.length) {
            const file = fileRef.current.files[0];
            const title = titleRef.current?.value;
            const description = descriptionRef.current?.value;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('Title', title || '');
            formData.append('description', description || '');

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
            <form action={uploadURL} method="POST" encType="multipart/form-data" onSubmit={onSub}>
                <input type="file" name="file" ref={fileRef} required />
                <input type="text" name="Title" ref={titleRef}/>
                <input type="text" name="description" ref={descriptionRef}/>
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
