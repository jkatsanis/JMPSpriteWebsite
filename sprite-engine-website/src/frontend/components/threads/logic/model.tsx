import { PATH_TO_ACCOUNT_FOLDER } from "macros";

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

    constructor(name: string, password: string, picture: string) {
        this.password = password;
        this.name = name;
        this.picture = `${PATH_TO_ACCOUNT_FOLDER}/accounts/icons/${picture}`;
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
    text: string;
    selectedImages: ImageData[];
    timesClicked: number;
    questionNumber: number;
    comments: Comment[];


    constructor(author: Account, title: string, text: string, count: number) {
        this.author = author;
        this.labels = [];
        this.text = text;
        this.title = title;
        this.timesClicked = 0;
        this.questionNumber = count;
        this.comments = [];
        this.selectedImages = [];
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
}