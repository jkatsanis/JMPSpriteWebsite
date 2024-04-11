import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'components/page';
import { threadRepo } from 'components/threads/logic/thread-repository';

import "./new-question.css";
import "utils/general.css";

const AddQuestionModal: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [alertTitle, setTitleAlert] = useState(false);
  const [alertContent, setContentAlert] = useState(false);

  const navigateTo = () => {
    navigate(`/threads`);
  };  

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const getElement = () => {
    let newElement = document.createElement("p");
    newElement.classList.add("alert-color");

    return newElement;
  };

  const checkSubmit = () => {
    if (content === "") {        
      if (!alertContent) {    
        let newElement = getElement();
        newElement.textContent = "You need to enter a content!";

        let element = document.getElementById("content-input");
        element!.insertAdjacentElement("afterend", newElement);

        setContentAlert(true);
      }
      return false;
    }
    if (title === "") {  
      if (!alertTitle) {
        let newElement = getElement();
        newElement.textContent = "You need to enter a title!";

        let element = document.getElementById("title-input");
        element!.insertAdjacentElement("afterend", newElement);
        setTitleAlert(true);
      }
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (checkSubmit()) {
      console.log("actual submit");

      if(threadRepo.active_account === null)
      {
        throw new Error("Why tf is it 0??");
      }
  
      threadRepo.addQuestion(threadRepo.active_account!, title, content);
  
      navigateTo(); // Navigating to the default site
    }
  };

  const handleCancel = () => {
    navigateTo();
  };

  return (
    <Page>
      <div className='centered-div-content-left-70'>
        <h2 style={{ marginBottom: '20px' }}>Add a New Question</h2>

        <div className="form-group" id="title-input">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Enter the title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group" id="content-input">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            style={{ height: '200px' }}
            className="form-control"
            placeholder="Enter the content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className='h-1'/>
        <div className='inline'>
          <button className="default-btn" onClick={handleSubmit}>Submit</button>
          <button className='default-btn' style={{marginLeft: 10}} onClick={handleCancel}>Cancel</button>
        </div>
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
    <div>
      <button className='new-question default-btn' onClick={navigateToQuestion}>Add Question</button>
    </div>
  );
};

export { NewQuestionButton, AddQuestionModal };
