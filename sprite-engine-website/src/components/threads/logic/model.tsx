export interface Account {
    password: string;
    name: string;
}

export enum Label {
    Graphic = 'GRAPHIC',
    Sprite = 'SPRITE'
}

  
export class Question {
    labels: Label[];
    author: Account;
    title: string;
    text: string;
    timesClicked: number;
    questionNumber: number;

    constructor(author: Account, title: string, text: string, count: number) {
        this.author = author;
        this.labels = [];
        this.text = text;
        this.title = title;
        this.timesClicked = 0;
        this.questionNumber = count;
        console.log("Jeee", author);
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