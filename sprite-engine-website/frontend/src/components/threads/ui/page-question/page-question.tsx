import React, { useState, useEffect } from 'react';
import { Page } from 'components/page';
import { useNavigate, useParams } from 'react-router-dom';
import { threadRepo } from '../../logic/thread-repository';
import { Question, Comment, ImageData } from '../../logic/model';
import { accountRepo } from '../../logic/account-repository';
import VoteComponent from './vote/vote';

import 'utils/general.css';
import './page-question.css';
import QuestionBluePrint from 'components/question/question-bp';
import ContributorsRenderer from './contributers';
import LabelRenderer from '../item-question/filter/label/labels-renderer';
import { LabelAdder } from '../item-question/filter/label/label-adder';

export const ThreadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    if (typeof id === 'string') {
      const number: number = parseInt(id);
      const fetchedQuestion: Question = threadRepo.getByID(number);
      setQuestion(fetchedQuestion);
      setComments(fetchedQuestion.getComments());
    }
  }, [id]);

  if (typeof id !== 'string' || !question) {
    return <div>Bruh this shit</div>;
  }

  const addComment = (title: string, content: string, images: ImageData[] | null) => {
    if (accountRepo.active_account === null) {
      console.log("[ERROR] You gotta have an account");
      return;
    }
    const newComment: Comment = new Comment(accountRepo.active_account, content);
    if (images !== null) {
      newComment.selectedImages = images;
    }

    const updatedComments: Comment[] = [...comments, newComment];
    question.addComment(newComment);
    setComments(updatedComments);
  };

  const handleSelectionChange = (label: string) => {
    setSelectedItems([...selectedItems, label]);
    question.addLabel(label);
  };

  const deleteThread = () => {
    threadRepo.removeThread(question.getId());
    navigate("/threads");
  };

  return (
    <Page>
      <div className="centered-div-content-left-70">
        <div className="inline">
          <div className="profile-container">
            <div className="profile-info inline">
              <img src={question.author.picture} alt="Profile Picture" className="profile-picture" />
              <h3 className="profile-author" style={{ marginLeft: '0.5rem' }}>{question.author.name}</h3>
            </div>
          </div>
          {accountRepo.active_account && accountRepo.active_account.name === question.author.name && (
            <button className="thread-delete-btn default-btn-np" onClick={deleteThread}>
              Delete
            </button>
          )}
        </div>

        <div className="question-container">
          <div className="question-content">
            <h1>{question.title}</h1>
            <p>{question.content}</p>
            {question.selectedImages && question.selectedImages.map((image, index) => (
              <details className="image-details" key={index}>
                <summary>{image.name}</summary>
                <img className="question-image" src={image.filePath} />
              </details>
            ))}
          </div>
        </div>
        <br />

        <div className="inline">
          {accountRepo.active_account && accountRepo.active_account.name === question.author.name && (
            <div style={{ marginLeft: '-1rem', width: '6rem' }}>
              <LabelAdder onChange={handleSelectionChange} presentItems={question.labels}/>
            </div>
          )}
          <LabelRenderer selectedItems={question.labels} />
        </div>
        <div className='h-1'/>
        {question && <ContributorsRenderer contributers={question.contributers} />}

        <div className="vote-pos">
          <VoteComponent question={question} />
        </div>

        <div className="comments-container">
          {comments.map((comment, index) => (
            <div key={index} className="comment-wrapper">
              <div className="profile-container">
                <div className="profile-info inline">
                  <img src={comment.author.picture} alt="Profile Picture" className="profile-picture" />
                  <h3 className="profile-author" style={{ marginLeft: '0.5rem' }}>{comment.author.name}</h3>
                </div>
              </div>
              <div className="question-container">
                <div className="question-content">
                  <p>{comment.content}</p>
                  {comment.selectedImages && comment.selectedImages.map((image, index) => (
                    <details className="image-details" key={index}>
                      <summary>{image.name}</summary>
                      <img className="question-image" src={image.filePath as string} alt={image.name} />
                    </details>
                  ))}
                </div>
              </div>
              <div className='h-2'/>
            </div>
          ))}
          <QuestionBluePrint enterTitle={false} qTitle="Add a Comment" submit={addComment} cancel={() => navigate(`/threads`)} isMainPage={false} />
        </div>
        <br />
      </div>
    </Page>
  );
};
