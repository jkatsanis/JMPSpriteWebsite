import React from 'react';

import { threadRepo } from '../logic/thread-repository';
import { RenderQuestion } from './item-question/question';
import { NewQuestionButton } from './new-question/new-question';

import "./item-question/question.css"
import "utils/general.css"
import "./new-question/new-question.css"

export class RenderCommonQuestions extends React.Component {
    render() {
      return (
        <div>

            <div className='inline'>
              <h1 className='common'>Common Questions: </h1>
              <NewQuestionButton/>
            </div>
            <div className='h-2'/>

            {threadRepo.getQuestions().map((question, index) => (
                <RenderQuestion key={index} question={question}/>
            ))}

        </div>  
      );
    }
}
