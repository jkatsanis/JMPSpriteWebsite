import { Question } from "./model";
import { Account } from "./model";
import { ImageData } from "./model";

export class ThreadRepository 
{
    private m_count: number = 0;
    private m_questions: Question[] = [];

    public active_account: Account | null;

    constructor()
    {
        let acc: Account = new Account("Manfred", "123Oga", "Manfred.png");


        this.addQuestion(acc, "How to?", "I cant do i t idj", null);

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

    addQuestion(acc:Account, title:string, content:string, images:ImageData[]|null)
    {
        this.m_count++;
        let question = new Question(acc, title, content, this.m_count);
        if(images !== null)
        {
            question.selectedImages = images;
        }
        this.m_questions.push(question);
    }

    fetch(id: number) : Question
    {
        for(let i = 0; i < this.m_questions.length; i++)
        {
            if(id === this.m_questions[i].questionNumber)
            {
                return this.m_questions[i];
            }
        }

        return null!;
    }
};

export let threadRepo:ThreadRepository = new ThreadRepository();
