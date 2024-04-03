import React from 'react';
import { useParams } from 'react-router-dom';

import { Question } from './model';
import { threadRepo } from './thread-repository';
import { useNavigate } from 'react-router-dom';

import './question.css'

export class RenderCommonQuestions extends React.Component {
    render() {
      return (
        <div>
            <h1 className='common'>Common Questions: </h1>
            <div className='h-2'/>

            {threadRepo.questions.map((question, index) => (
                <RenderQuestion key={index} question={question}/>
            ))}

        </div>
      );
    }
}

interface QuestionProps 
{
    question: Question;
}

export const RenderQuestion: React.FC<QuestionProps> = ({ question }) => {
    const navigate = useNavigate();
  
    const navigateToHello = () => {
      navigate('/threads/1');
    };
  
    return (
      <div className='question' onClick={navigateToHello}>
        <div className='inline'>
          <p className='question-p'>{question.title}</p>
          <p className='question-counter'>#{question.questionNumber}</p>
        </div>
        <p className='question-btm-info'>{question.author.name}</p>
      </div>
    );
  };


export const ThreadPage: React.FC = () => {

    
  // Get the route parameters
  const { id } = useParams<{ id: string }>();

  // Now you can use the id parameter as needed
  console.log("ID:", id);

  if(typeof id != 'string')
  {
    return <div>Bruh this shit </div>;
  }
    let number:number = parseInt(id);
    const question: Question = threadRepo.fetch(number);

  

  return (
    <div>
      I got clicked lil nigga
      <p>{question.text}</p>
    </div>
  );
};
