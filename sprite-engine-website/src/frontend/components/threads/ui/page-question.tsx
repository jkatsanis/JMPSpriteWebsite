import React from 'react';

import { Page } from 'frontend/components/page';
import { useParams } from 'react-router-dom';
import { threadRepo } from '../logic/thread-repository';
import { Question } from '../logic/model';

import "frontend/utils/general.css"

export const ThreadPage: React.FC = () => { 
    // Get the route parameters
    const { id } = useParams<{ id: string }>();
  
    if(typeof id !== 'string')
    {
      return <div>Bruh this shit </div>;
    }
      let number:number = parseInt(id);
      const question: Question = threadRepo.fetch(number);
 
  
    return (
      <Page>
        <div className='centered-div-content-left-70'>
            <h1>{question.title}</h1>
            <p>{question.text}</p>
        </div>
      </Page>
    );
  };
  