import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../macros";

const ProjectCreation: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if (fileRef.current?.files) {
            formData.append("file", fileRef.current.files[0]);
        }
        formData.append("title", titleRef.current?.value || "");
        formData.append("description", descriptionRef.current?.value || "");

        try {
            const response = await fetch(`${URL}/api/projects/upload`, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Error uploading project');
            }
            navigate("/");
        } catch (error) {
            console.error('Error uploading project:', error);
        }
    };

    return (
        <div>
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" ref={fileRef} required />
                <input type="text" name="title" ref={titleRef} placeholder="Title" required />
                <input type="text" name="description" ref={descriptionRef} placeholder="Description" required />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default ProjectCreation;
