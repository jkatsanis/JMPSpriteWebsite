import { accountRepo } from "./account-repository";
import { Question } from "./model";
import { Account } from "./model";
import { ImageData } from "./model";
import { Label } from "./model";
import { URL } from "frontend/macros";
import { bFetch } from "frontend/utils/general";
import { Log } from "frontend/utils/general";

export class ThreadRepository 
{
    private m_count: number = 0;
    private m_questions: Question[] = [];

    public async initialize() {
        await accountRepo.init(); // initing account repo
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

        let threads:any[] = await bFetch(url, "GET");

        for(let i = 0; i < threads.length; i++)
        {
            const t = threads[i];

            let acc:Account = accountRepo.getAccountByName(t.author);

            if(acc === null)
            {
                Log.log("[ERROR] Accounts was null!");
                continue;
            }
             
            const thread:Question = new Question(acc, t.title, t.content, t.id);

            this.m_questions.push(thread);
        }

        console.log(this.m_questions);
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
  
        await bFetch(url, 'POST', object);
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
