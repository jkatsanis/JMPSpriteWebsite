import { PATH_TO_ACCOUNT_FOLDER } from "macros";

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

export enum Label {
    Graphic = 'GRAPHIC',
    Sprite = 'SPRITE'
}

export class Comment 
{
    author: Account;
    content: string;

    constructor(author: Account, content: string)
    {
        this.author = author;
        this.content = content;
    }
}
  
export class Question {
    labels: Label[];
    author: Account;
    title: string;
    text: string;
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
    }

    addLabel(label: Label): void {
        this.labels.push(label);
    }

    removeLabel(label: Label): void {
        const index = this.labels.indexOf(label);
        if (index !== -1) {
            this.labels.splice(index, 1);
        }
    }
}