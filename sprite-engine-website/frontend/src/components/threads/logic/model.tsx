import { bFetch } from "utils/general";
import { URL } from "macros";

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
    static s_commentId: number = 1;

    author: Account;
    content: string;
    selectedImages: ImageData[];

    private id: number;

    constructor(author: Account, content: string)
    {
        this.author = author;
        this.content = content;
        this.selectedImages = [];
        this.id = Comment.s_commentId;
        Comment.s_commentId++;
    }

    getId() : number {
        return this.id;
    }
    
    setId(id: number)
    {
        this.id = id;
    }
}
  
export class Question {
    labels: string[];
    author: Account;
    title: string;
    content: string;
    selectedImages: ImageData[];
    timesClicked: number;
    private id: number;
    contributers: Account[];
    public votes: number;
    private m_comments: Comment[];


    constructor(author: Account, title: string, text: string, count: number, lbls: string[]) {
        this.author = author;
        this.labels = [];
        this.content = text;
        this.title = title;
        this.timesClicked = 0;
        this.id = count;
        this.m_comments = [];
        this.selectedImages = [];
        this.contributers = [];
        this.labels = lbls;
        this.votes = 0;
        this.addContributer(author);
    }

    getId() : number
    {
        return this.id;
    }


    addContributer(author: Account)
    {
        const authorExists = this.contributers.some(existingAuthor => existingAuthor.name === author.name);

        if (!authorExists) {
            this.contributers.push(author);
        }
    }

    async addCommentToDB(comment: Comment, parentcommentId: number)
    {
        let sThreadId = this.id;
        let sId = parentcommentId + 1;
        let sAuthor = comment.author.name;
        let sContent = comment.content;

        if(parentcommentId === -1)
        {
            sId = 1;
        }
        
        let object = new class {
            id = sId;
            threadId = sThreadId; 
            parentCommentId = parentcommentId;
            author = sAuthor;
            content = sContent;
        }

        console.log(object);

        const server = URL + "/api/questions/comment";
        await bFetch(server, "POST", object);
    }

    async addComment(comment: Comment)
    {
        let parentcommentId = -1;

        if(this.m_comments.length !== 0)
        {
            parentcommentId = this.m_comments[this.m_comments.length - 1].getId();;
        } 

        await this.addCommentToDB(comment, parentcommentId);

        if(this.m_comments.length === 0)
        {
            comment.setId(1);
        }
        else 
        {
            comment.setId(parentcommentId + 1);
        }
        this.m_comments.push(comment);
        this.addContributer(comment.author);
    }   

    loadContributers()
    {
        this.contributers.push(this.author);
        for(let i = 0; i < this.m_comments.length; i++)
        {
            this.addContributer(this.m_comments[i].author);
        }
    }

    getLabelString() : string 
    {
        let str = "";
        for(let i = 0; i < this.labels.length; i++)
        {
            if(i === this.labels.length - 1)
            {
                str += this.labels[i];
            }
            else {
                str += this.labels[i] + ";";
            }
        }

        return str;
    }

    async addLabel(label: string): Promise<void> {
        this.labels.push(label);
        let server = URL + "/api/questions/thread";


        let sID = this.id;
        let sContent = this.content;
        let sTitle = this.title;
        let sLabels = this.getLabelString();
        let sAccName = this.author.name;

        let object = new class { 
            id = sID;
            content = sContent;
            title = sTitle;
            labels = sLabels;
            author = sAccName;
        };

        await bFetch(server, "PATCH", object);
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