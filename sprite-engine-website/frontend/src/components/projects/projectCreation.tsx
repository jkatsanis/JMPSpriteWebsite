import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../../macros";
import {accountRepo} from "components/threads/logic/account-repository";

const ProjectCreation: React.FC = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
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
        formData.append("owner", accountRepo.active_account?.name|| "");

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
        <div className="container">
            <div className="project">
            <h1>Create Project</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" ref={fileRef} required />
                <input type="text" name="title" ref={titleRef} placeholder="Title" required />
                <textarea name="description" ref={descriptionRef} required  className="formi-control"/>
                <button type="submit" className="default-btn">Upload</button>
            </form>
            </div>
        </div>
    );
};

export default ProjectCreation;
