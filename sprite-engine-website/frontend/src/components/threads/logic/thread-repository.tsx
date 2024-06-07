import { AccountRepository, accountRepo } from "./account-repository";
import { Question } from "./model";
import { Account } from "./model";
import { ImageData } from "./model";
import { Label } from "./model";
import { URL } from "macros";
import { bFetch } from "utils/general";
import { Log } from "utils/general";

export class ThreadRepository 
{
    private m_count: number = 0;
    private m_questions: Question[] = [];
    private m_thread_url;
    private m_inited:boolean;

    constructor()
    {
        this.m_inited = false;
        this.m_thread_url = URL + "/api/questions";
    }

    public async initialize(accRepo: AccountRepository) : Promise<void>
    {
        if(this.m_inited)
        {
            Log.log("[REPO] Account repo already inited");
            return;
        }
    
        this.m_inited = true;
        await accRepo.init();
        await this.readQuestionsFromDB();

        console.log(this.m_questions);
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
        let url = this.m_thread_url + "/threads";

        let threads:any[] = await bFetch(url, "GET");

        for(let i = 0; i < threads.length; i++)
        {
            const t = threads[i];

            let acc:Account = accountRepo.getAccountByName(t.author);
            let labels = t.labels;

            if(acc === null)
            {
                // this.removeThread(t.id);
                Log.log("[ERROR] Accounts was null!");
                continue;
            }
             
            const thread:Question = new Question(acc, t.title, t.content, t.id);

            this.m_count++;
            this.m_questions.push(thread);
        }
    }

    async removeThread(id: number)
    {
        let url = this.m_thread_url + "/thread/" + id;
        this.m_questions = this.m_questions.filter(thread => thread.id !== id);

        await bFetch(url, 'DELETE');
    }

    async addQuestion(acc:Account, title:string, content:string, images:ImageData[]|null, labels: Label[])
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

        let labelStr = "";
        for (let i = 0; i < labels.length; i++) {
            labelStr += labels[i];
            if (i !== labels.length - 1) {
                labelStr += ";";
            }
        }
        
        let object = new class { 
            id = id;
            content = content;
            title = title;
            labels = labelStr; 
            author = acc.name;
        };

        console.log(object);
  
        await bFetch(url, 'POST', object);
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
