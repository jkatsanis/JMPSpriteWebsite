import { Question } from "./model";
import { Account } from "./model";
import { ImageData } from "./model";
import { Label } from "./model";
import { URL } from "frontend/macros";
import { bFetch } from "frontend/utils/general";

export class ThreadRepository 
{
    private m_count: number = 0;
    private m_questions: Question[] = [];

    constructor() {
        this.initialize();
    }

    private async initialize() {

        await this.readQuestionsFromDB();
    }

    getQuestion(title: string): Question {
        for(let i = 0; i < this.m_questions.length; i++)
        {
            if(this.m_questions[i].title === title)
            {
                return this.m_questions[i];
            }
        }

        return null!;
    }

    getQuestions(): Question[] 
    {
        return this.m_questions;
    }

    async readQuestionsFromDB()
    {
        let url = URL + "/api/questions/threads";

        let threads = await bFetch(url, "GET");


        console.log(threads);
    }

    async addQuestion(acc:Account, title:string, content:string, images:ImageData[]|null)
    {
        this.m_count++;
        let question = new Question(acc, title, content, this.m_count);
        if(images !== null)
        {
            question.selectedImages = images;
        }
        this.m_questions.push(question);

        let url = URL + "/api/questions/thread";
        let id = this.m_count;

        let object = new class { 
            id = id;
            content = content;
            title = title;
            labels = ""; 
            author = acc.name;
        };
  
        const postResponse = await bFetch(url, 'POST', object);
        console.log("P: "+  postResponse);
    }

    addQuestionWithLabels(acc:Account, title:string, content:string, images:ImageData[]|null, labels: Label[])
    {
        this.addQuestion(acc, title, content, images);
        for(let i = 0; i < labels.length; i++)
        {
            this.addLabelToQuestion(this.m_count, labels[i]);
        }
    }

    addLabelToQuestion(questionNumber: number, label: string): void {
        const question = this.fetch(questionNumber);
        if (question) {
            question.labels.push(label);
        }
    }
    
    fetch(id: number) : Question
    {
        for(let i = 0; i < this.m_questions.length; i++)
        {
            if(id === this.m_questions[i].id)
            {
                return this.m_questions[i];
            }
        }

        return null!;
    }
};

export let threadRepo:ThreadRepository = new ThreadRepository();
