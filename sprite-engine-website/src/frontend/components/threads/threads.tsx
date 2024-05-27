import './threads.css';
import { Page } from 'frontend/components/page';
import 'frontend/utils/general.css';
import SearchComponent from 'frontend/utils/search/search';
import { handleThreadsEnterClick, searchThreads } from './logic/search-threads';
import RenderQuestions from './ui/item-question/questions';

export function Threads() {
    return (
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
                
                <RenderQuestions /> 
                <div id="scroll-to-me"></div>
            </div>
        </Page>
    );
}
