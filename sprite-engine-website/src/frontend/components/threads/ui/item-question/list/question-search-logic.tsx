import React from 'react';
import { threadRepo } from 'frontend/components/threads/logic/thread-repository';
import { RenderQuestion } from '../item/question';
import { Question } from 'frontend/components/threads/logic/model';

import { filterRepo } from 'frontend/components/threads/logic/filter-repository';

interface QuestionSearchLogicProps {
    filter: boolean;
}

export class QuestionSearchLogic extends React.Component<QuestionSearchLogicProps> {

    canRenderQuestion(question: Question) {
       for (let key = 0; key < filterRepo.labels.length; key++) {
            const label = filterRepo.labels[key];
            if (!question.labels.includes(label)) {
                return false;
            }
        }
        if(filterRepo.account !== ""
            && !question.author.name.includes(filterRepo.account))
        {
            return false;
        }
        
        return true;
    }

    render() {
        return (
            <div>
                {threadRepo.getQuestions().map((question, index) => (
                    this.canRenderQuestion(question) && 
                    <RenderQuestion key={index} question={question}/>
                ))}
            </div>
        );
    }
}
