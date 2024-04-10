import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from 'components/page';
import "./new-question.css"

interface AddQuestionModalProps {
  // Define props here if needed
}

class AddQuestionModal extends Component<AddQuestionModalProps> {
  title: string = '';
  content: string = '';

  handleTitleChange = () => {
  };

  handleContentChange = () => {
  };

  handleSubmit = () => {
    // You can handle submission here, e.g., send data to server, etc.
    console.log('Title:', this.title);
    console.log('Content:', this.content);
    // Reset variables if needed
    this.title = '';
    this.content = '';
  };

  render() {
    return (
      <Page>
        <div className='centered-div-content-left-70'>
          <h2 style={{ marginBottom: '20px' }}>Add a New Question</h2>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              id="title"
              type="text"
              className="form-control"
              placeholder="Enter the title"
              onChange={this.handleTitleChange} // Assuming you pass down handleTitleChange as a prop
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              className="form-control"
              placeholder="Enter the content"
              onChange={this.handleContentChange} // Assuming you pass down handleContentChange as a prop
            />
          </div>
          <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
        </div>
      </Page>
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
