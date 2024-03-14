import { Question } from "./model";
import { Account } from "./model";

export class ThreadRepository 
{
    public questions: Question[] = [];
    public accounts: Account[] = [];

    constructor()
    {
        let acc: Account = {
            name: "Manfred",
            password: "123OGa"

        };

        this.accounts.push(acc);

        this.questions.push(new Question(acc, "How do i get bitches?", "Hello i am 8 and i cant get bitches lmfao"));
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
