import React from 'react';
import { Page } from 'frontend/components/page';
import { useNavigate, useParams } from 'react-router-dom';
import { threadRepo } from '../../logic/thread-repository';
import { Question } from '../../logic/model';
import { PATH_TO_ACCOUNT_FOLDER } from 'macros';
import { useState } from 'react';

import 'frontend/utils/general.css';
import './page-question.css';
import QuestionBluePrint from 'frontend/components/question/question-bp';

export const ThreadPage: React.FC = () => { 
  const navigate = useNavigate();

  const navigateToThreads = () => {
    navigate(`/threads`);
  };  

  const comment = () => {

  }

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
      <div className='centered-div-content-left-70'>
        <div className='profile-container'>
          <div className='profile-info inline'>
              <img src={pic} alt="Profile Picture" className="profile-picture" />
              <h3 className='profile-author' style={{marginLeft: '0.5rem'}}>{question.author.name}</h3>
          </div>
        </div>
        <div className='question-container'>
          <div className='question-content'>
              <h1>{question.title}</h1>
              <p>{question.text}</p>
          </div>
        </div>

        <QuestionBluePrint enterTitle={false} qTitle='Add a new question' submit={comment} cancel={navigateToThreads}/>


      </div>
    </Page>
  );
};
