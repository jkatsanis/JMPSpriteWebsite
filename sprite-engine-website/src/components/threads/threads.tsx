import './threads.css';
import { Page } from 'components/page';
import 'utils/general.css'
import { Question } from './model';
import { Account } from './model'
import { RenderCommonQuestions } from './question';
import SearchComponent from 'components/search';

import { handleThreadsEnterClick, searchThreads } from './search-threads';


export function Threads(){

    return(
        <Page>
            <div className='centered-div-content-left-70'>
                <h1 className='common'>Rules: </h1>
                <br/>
                    <ul>
                        <li>Please stay respectful and do not provoke other members.</li>
                        <li>Do not spam questions.</li>
                        <li>Try to find a similar question before creating your own.</li>
                    </ul>

                <div className='h-2'/>
                <SearchComponent handleEnterPress={handleThreadsEnterClick} search={searchThreads} searchFor='Search for threads...'/>
                <div className='h-2'/>
                <RenderCommonQuestions/>

            </div>
        </Page>
    );
}

