import React, { useEffect, useState } from 'react';
import './threads.css';
import { Page } from 'frontend/components/page';
import 'frontend/utils/general.css';
import SearchComponent from 'frontend/utils/search/search';
import { handleThreadsEnterClick, searchThreads } from './logic/search-threads';
import RenderQuestions from './ui/item-question/questions';
import { threadRepo } from './logic/thread-repository';

export function Threads() {
    const [state, setState] = useState(0);  // Initialize state

    useEffect(() => {
        const fetchQuestions = async () => {

            console.log(threadRepo.inited);
            if (!threadRepo.inited) 
            {
                await threadRepo.initialize();
                setState(prevState => prevState + 1);  
            }
        };

        fetchQuestions();
    }, []);

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
