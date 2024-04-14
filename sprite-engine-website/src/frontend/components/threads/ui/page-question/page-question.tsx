import React from 'react';
import { Page } from 'frontend/components/page';
import { useParams } from 'react-router-dom';
import { threadRepo } from '../../logic/thread-repository';
import { Question } from '../../logic/model';
import { PATH_TO_ACCOUNT_FOLDER } from 'macros';

import 'frontend/utils/general.css';
import './page-question.css';

export const ThreadPage: React.FC = () => { 
  // Get the route parameters
  const { id } = useParams<{ id: string }>();

  if (typeof id !== 'string') {
    return <div>Bruh this shit</div>;
  }

  let number: number = parseInt(id);
  const question: Question = threadRepo.fetch(number);

  let pic = `${PATH_TO_ACCOUNT_FOLDER}/accounts/icons/${question.author.picture}`;

  return (
    <Page>
      <div className='question-container'>
        <div className='profile-info'>
          <img src={pic} alt="Profile Picture" className="profile-picture" />
          <h3>{question.author.name}</h3>
        </div>
        <div className='question-content'>
          <div className='centered-div-content-left-70'>
            <h1>{question.title}</h1>
            <p>{question.text}</p>
          </div>
        </div>
      </div>
    </Page>
  );
};
