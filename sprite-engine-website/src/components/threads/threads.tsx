import './threads.css';
import { Page } from 'components/page';
import 'utils/general.css'
import { RenderCommonQuestions } from './ui/question';
import SearchComponent from 'utils/search/search';
import { handleThreadsEnterClick, searchThreads } from './logic/search-threads';

export function Threads(){

    return(
        <Page>
            <div className='centered-div-content-left-70'>
                <h1 className='common'>Rules: </h1>
                <br/>
                    <ul>
                        <li>Please stay respectful.</li>
                        <li>Do not spam questions.</li>
                        <li>Try to find a similar question before creating your own.</li>
                    </ul>

                <div className='h-2'/>
                <SearchComponent id='question-searcher' handleEnterPress={handleThreadsEnterClick} search={searchThreads} searchFor='Search for threads...'/>
                <div className='h-2'/>
                <RenderCommonQuestions/>
                <div id="scroll-to-me"></div>

            </div>
        </Page>
    );
}

