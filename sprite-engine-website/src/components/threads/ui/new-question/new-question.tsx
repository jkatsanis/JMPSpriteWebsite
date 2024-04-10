import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import "./new-question.css"

class AddQuestionModal extends Component {
  render() {


    return (
        <div>
            <h1>Hi</h1>
        </div>
    );
  }
}

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
}

export { NewQuestionButton, AddQuestionModal }