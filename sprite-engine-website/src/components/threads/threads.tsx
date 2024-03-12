import React from 'react';
import './threads.css';
import { Page } from 'components/page';
import 'utils/general.css'
import { Question } from './model';
import { Account } from './model'

let question: Question[] = [];

let acc: Account = {
    name: "Manfred",
    password: "123OGa"
};

question.push(new Question(acc, "How do i get bitches?", "Hello i am 8 and i cant get bitches lmfao"));


export function Threads(){

    return(
        <Page>
            <div className='centered-div-content-left-70'>
                <RenderCommonQuestions/>
            </div>
        </Page>
    );
}


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