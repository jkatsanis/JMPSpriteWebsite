import React from 'react';
import { useParams } from 'react-router-dom';

import { Question } from '../logic/model';
import { threadRepo } from '../logic/thread-repository';
import { useNavigate } from 'react-router-dom';

import './question.css'

interface QuestionProps 
{
    question: Question;
}

export const RenderQuestion: React.FC<QuestionProps> = ({ question }) => {
    const navigate = useNavigate();
  
    const navigateToQuestion = (question: number) => {
      navigate(`/threads/${question}`);
    };
  
    return (
      <div className='question' onClick={() => navigateToQuestion(question.questionNumber)}>
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
      <p>{question.text}</p>
    </div>
  );
};