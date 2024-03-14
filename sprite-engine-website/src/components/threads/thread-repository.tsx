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
};

export let threadRepo:ThreadRepository = new ThreadRepository();
