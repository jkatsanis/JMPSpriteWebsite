import { AccountRepository, accountRepo } from "./account-repository";
import { Question } from "./model";
import { Account } from "./model";
import { ImageData } from "./model";
import { Label } from "./model";
import { SERVER_UL, URL } from "macros";
import { bFetch } from "utils/general";
import { Log } from "utils/general";
import { Comment } from "./model";

export class ThreadRepository 
{
    private m_count: number = 0;
    private m_questions: Question[] = [];
    private m_thread_url;
    private m_inited:boolean;
    private m_reading: boolean;

    constructor()
    {
        this.m_reading = false;
        this.m_inited = false;
        this.m_thread_url = URL + "/api/questions";
    }

    public async initialize(setInit: (val: boolean) => void) : Promise<void>
    {
        if(this.m_inited)
        {
            Log.log("[REPO] Thread repo already inited");

            this.m_questions = [];
            this.m_count = 0;
        }

        this.m_inited = true;
        
        await this.readQuestionsFromDB(setInit);
        this.getHighestCount();
    }

    getHighestCount()
    {
        for(let q of this.m_questions)
        {
            if(q.getId() > this.m_count)
            {
                this.m_count = q.getId() + 1;
            }
        }
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


    async writePictures(images: ImageData[], id: number)
    {
        console.log("run");
        let pictureData = new FormData();
        for(let i = 0; i < images.length; i++)
        {
            pictureData.append('picture', images[i].data);
            await fetch(URL + "/api/pictures/" + id, {
                method: "PUT",
                body: pictureData
            }).then((response) => {
                console.log(response.json());
            })
        }
    }

    async readPictures(question: Question)
    {
        const url = URL + "/api/pictures/" + question.getId();
        let pics: any[] = await bFetch(url, "GET");
        for(let i = 0; i < pics.length; i++)
        {
            let picture = pics[i] as string;
            let img = new ImageData("pic" + i, null!);
            img.filePath = SERVER_UL + "/threads/" + question.getId() + "/" + picture;
            question.selectedImages.push(img);
        }
    }

    async readQuestionsFromDB(setInit: (val: boolean) => void)
    {
        if(this.m_reading)
        {
            return true;
        }
        this.m_reading = true;
        let url = this.m_thread_url + "/threads";

        let threads:any[] = await bFetch(url, "GET");

        for(let i = 0; i < threads.length; i++)
        {
            const t = threads[i];

            let acc:Account = await accountRepo.getAccountByName(t.author);
            let labels: string = t.labels;      

            if(acc === null)
            {
                // this.removeThread(t.id);
                Log.log("[ERROR] Accounts was null!");
               //  continue;
            }
             
            const thread:Question = new Question(acc, t.title, t.content, t.id, labels.split(';'));
        
            await this.readComments(thread, acc);
            await this.readPictures(thread);

            this.m_count++;
            this.m_questions.push(thread);
        }
        setInit(true);
        this.m_reading = false;
    }

    async readComments(thread: Question, author: Account)
    {
        const server = URL + "/api/questions/thread/comments/" + thread.getId();
        let comments: any[] = await bFetch(server, "GET");

        // Bubble sort implementation
        for (let i = 0; i < comments.length - 1; i++) {
            for (let j = 0; j < comments.length - i - 1; j++) {
                if (comments[j].parentCommentId > comments[j + 1].parentCommentId) {
                    // Swap comments[j] and comments[j + 1]
                    let temp = comments[j];
                    comments[j] = comments[j + 1];
                    comments[j + 1] = temp;
                }
            }
        }
        
        let threadComments: Comment[] = [];

        for(let comment of comments)
        {
            if(comment.content === undefined)
            {
                continue;
            }
            let threadComment = new Comment(author, comment.content);
            threadComments.push(threadComment);
        }

        thread.setComments(threadComments);
    }

    async removeThread(id: number)
    {
        let url = this.m_thread_url + "/thread/" + id;
        this.m_questions = this.m_questions.filter(thread => thread.getId() !== id);

        await bFetch(url, 'DELETE');
    }

    async addQuestion(acc:Account, title:string, content:string, images:ImageData[]|null, labels: string[])
    {
        this.m_count++;
        let question = new Question(acc, title, content, this.m_count, labels);
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


        await bFetch(url, 'POST', object);

        if(images !==  null)
        {
            await this.writePictures(images, id);
        }     
        question.selectedImages = [];
        await this.readPictures(question);
    }
    
    getByID(id: number) : Question
    {
        for(let i = 0; i < this.m_questions.length; i++)
        {
            if(id === this.m_questions[i].getId())
            {
                return this.m_questions[i];
            }
        }

        return null!;
    }
};

export let threadRepo:ThreadRepository = new ThreadRepository();
