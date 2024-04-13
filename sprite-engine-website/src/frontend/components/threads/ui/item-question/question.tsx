import React from 'react';
import { Question } from '../../logic/model';
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


