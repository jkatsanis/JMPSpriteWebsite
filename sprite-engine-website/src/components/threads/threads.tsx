import './threads.css';
import { Page } from 'components/page';
import 'utils/general.css'
import { Question } from './model';
import { Account } from './model'
import { RenderCommonQuestions } from './question';
import SearchComponent from 'components/search';

import { handleThreadsEnterClick, searchThreads } from './search-threads';

export let question: Question[] = [];

let acc: Account = {
    name: "Manfred",
    password: "123OGa"
};

question.push(new Question(acc, "How do i get bitches?", "Hello i am 8 and i cant get bitches lmfao"));


export function Threads(){

    return(
        <Page>
            <div className='centered-div-content-left-70'>
                <h1 className='common'>Rules: </h1>
                <br/>
                <tr>
                    <li>Please stay respectful and do not provocate (how tf do you write this) other members. </li>
                    <li>Do not spam questions</li>
                    <li>Try to find a question similar before creating your own</li>
                </tr>

                <div className='h-2'/>
                <SearchComponent handleEnterPress={handleThreadsEnterClick} search={searchThreads} searchFor='Search for threads...'/>
                <div className='h-2'/>

                <RenderCommonQuestions/>
            </div>
        </Page>
    );
}

