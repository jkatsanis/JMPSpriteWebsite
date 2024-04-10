import { Question } from "./model";
import { Account } from "./model";

export class ThreadRepository 
{
    private m_count: number = 0;
    public questions: Question[] = [];
    public accounts: Account[] = [];
    public active_account: Account | null;

    constructor()
    {
        let acc: Account = {
            name: "Manfred",
            password: "123OGa"

        };
        this.m_count++;
        this.accounts.push(acc);

        this.questions.push(new Question(acc, "How do i get bitches?", "Hello i am 8 and i cant get bitches lmfao", this.m_count));

        this.active_account = null;
    }

    fetch(id: number) : Question
    {
        for(let i = 0; i < this.questions.length; i++)
        {
            if(id === this.questions[i].questionNumber)
            {
                return this.questions[i];
            }
        }

        return null!;
    }
};

export let threadRepo:ThreadRepository = new ThreadRepository();
