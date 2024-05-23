import { Question } from "./model";
import { Account } from "./model";
import { ImageData } from "./model";
import { Label } from "./model";

import { URL } from "frontend/macros";

export class ThreadRepository 
{
    private m_count: number = 0;
    private m_questions: Question[] = [];

    public active_account: Account | null;

    constructor()
    {
        let acc: Account = new Account("Manfred", "123Oga", "Manfred.png");

        this.addQuestionWithLabels(acc, "saugew", "I cant do i t idj", null, [ Label.Bug, Label.Editor ]);

        
        this.addQuestionWithLabels(new Account("Ugafred", "123Oga", "Manfred.png"), "How to?", "I cant do i t idj", null, [ Label.Feature, Label.Editor ]);


        this.active_account = acc;
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

        console.log(object);

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
            }).then(res => console.log(res));
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
