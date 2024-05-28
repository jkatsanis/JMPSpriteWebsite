import { PATH_TO_ACCOUNT_FOLDER } from "frontend/macros";

export enum Label {
    Bug = 'Bug',
    Feature = 'Feature',
    UI = 'UI',
    Editor = 'Editor'
    // Add more labels here
}
export const LabelColors: { [key: string]: string } = {
    Bug: 'green',
    Feature: 'brown',
    UI: 'blue',
    Editor: 'purple',
    // Add more labels and their colors here
};

export class Account {
    password: string;
    name: string;
    picture: string;
    email: string;

    constructor(name: string, password: string, picture: string, email: string) {
        this.password = password;
        this.name = name;
        this.picture = picture;
        this.email = email;
    }
}

export class ImageData {
    name: string;
    data: string | ArrayBuffer | null;

    constructor(name: string, data: string | ArrayBuffer | null) {
        this.name = name;
        this.data = data;
    }
}

export class Comment 
{
    author: Account;
    content: string;
    selectedImages: ImageData[];

    constructor(author: Account, content: string)
    {
        this.author = author;
        this.content = content;
        this.selectedImages = [];
    }
}
  
export class Question {
    labels: string[];
    author: Account;
    title: string;
    content: string;
    selectedImages: ImageData[];
    timesClicked: number;
    id: number;
    contributers: Account[];

    private m_comments: Comment[];


    constructor(author: Account, title: string, text: string, count: number) {
        this.author = author;
        this.labels = [];
        this.content = text;
        this.title = title;
        this.timesClicked = 0;
        this.id = count;
        this.m_comments = [];
        this.selectedImages = [];
        this.contributers = [];

        this.contributers.push(author);
    }

    addComment(comment: Comment)
    {
        this.m_comments.push(comment);
        this.contributers.push(comment.author);
    }   

    loadContributers()
    {
        this.contributers.push(this.author);
        for(let i = 0; i < this.m_comments.length; i++)
        {
            this.contributers.push(this.m_comments[i].author);
        }
    }

    addLabel(label: string): void {
        this.labels.push(label);
    }

    removeLabel(label: string): void {
        const index = this.labels.indexOf(label);
        if (index !== -1) {
            this.labels.splice(index, 1);
        }
    }

    getComments() : Comment[]
    {
        return this.m_comments;
    }
}