import React from 'react';

import { Question } from './model';
import { question } from './threads'

import './question.css'

export class RenderCommonQuestions extends React.Component {
    render() {
      return (
        <div>
         <h1 className='common'>Common Questions: </h1>
         <div className='h-2'/>
            {question.map((question) => (
                <RenderQuestion question={question}/>
            ))}

        </div>
      );
    }
}

interface QuestionProps 
{
    question: Question;
}

export class RenderQuestion extends React.Component<QuestionProps> {

    render() 
    {
        return (
            <div className='question'>
                <div className='inline'>
                    <p className='question-p'>{this.props.question.title}</p>
                    <p className='question-counter'>#{this.props.question.questionNumber}</p>
                </div>
                <p className='question-btm-info'>{this.props.question.author.name}</p>
            </div>

        );
    }

}