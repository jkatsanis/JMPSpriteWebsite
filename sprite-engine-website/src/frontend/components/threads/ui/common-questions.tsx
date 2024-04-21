import React from 'react';

import { threadRepo } from '../logic/thread-repository';
import { RenderQuestion } from './item-question/question';
import { NewQuestionButton } from './new-question/new-question';

import "./item-question/question.css"
import "frontend/utils/general.css"
import "./new-question/new-question.css"
import FilterQuestionButton from './filter/filter-question-button';

export class RenderCommonQuestions extends React.Component {
    render() {
      return (
        <div>
            <div className='inline'>
              <h1 className='common'>Common Questions: </h1>
                <div style={{position: 'relative', left: '32rem'}}>
                  <FilterQuestionButton/>
                  <NewQuestionButton/>
                </div>
            </div>
    
            <div className='h-2'/>

            {threadRepo.getQuestions().map((question, index) => (
                <RenderQuestion key={index} question={question}/>
            ))}
        </div>  
      );
    }
}
