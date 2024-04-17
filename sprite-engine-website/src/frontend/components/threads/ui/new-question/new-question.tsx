import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'frontend/components/page';
import { threadRepo } from 'frontend/components/threads/logic/thread-repository';
import { ImageData } from '../../logic/model';

import "./new-question.css";
import "frontend/utils/general.css";
import QuestionBluePrint from 'frontend/components/question/question-bp';

const AddQuestionModal: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/threads`);
  };  

  const submit = (title: string, content: string, images: ImageData[]) => {
    console.log("actual submit ");

    if(threadRepo.active_account === null)
    {
      throw new Error("Why tf is it 0??");
    }

    threadRepo.addQuestion(threadRepo.active_account!, title, content, images);

    navigateTo(); 
  }

  return (
    <Page>
      <div className='centered-div-content-left-70'>
        <QuestionBluePrint enterTitle={true} qTitle='Add a new question' submit={submit} cancel={navigateTo}/>        
      </div>
    </Page>
  );
};

const NewQuestionButton: React.FC = () => {
  const navigate = useNavigate();

  const navigateToQuestion = () => {
    navigate(`/threads/new`);
  };

  return (
      <button style={{marginLeft: '35rem'}} className='default-btn' onClick={navigateToQuestion}>Add Question</button>
  );
};

export { NewQuestionButton, AddQuestionModal };