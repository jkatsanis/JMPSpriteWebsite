import React, { useState, useEffect } from 'react';
import { Page } from 'frontend/components/page';
import { useNavigate, useParams } from 'react-router-dom';
import { threadRepo } from '../../logic/thread-repository';
import { Question } from '../../logic/model';
import { Comment } from '../../logic/model';
import { ImageData } from '../../logic/model';

import 'frontend/utils/general.css';
import './page-question.css';
import QuestionBluePrint from 'frontend/components/question/question-bp';

export const ThreadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (typeof id === 'string') {
      let number: number = parseInt(id);
      const fetchedQuestion: Question = threadRepo.fetch(number);
      setQuestion(fetchedQuestion);
      setComments(fetchedQuestion.comments);
    }
  }, [id]);

  if (typeof id !== 'string' || !question) {
    return <div>Bruh this shit</div>;
  }

  const addComment = (title:string, content: string, images: ImageData[]|null) => {
    if (threadRepo.active_account === null) {
      console.log("[ERROR] You gotta have an account");
      return;
    }
    const newComment: Comment = new Comment(threadRepo.active_account, content);
    if(images !== null)
    {
        newComment.selectedImages = images
    }
    
    const updatedComments: Comment[] = [...comments, newComment];
    setComments(updatedComments);
  };

  return (
    <Page>
      <div className='centered-div-content-left-70'>
        <div className='profile-container'>
          <div className='profile-info inline'>
            <img src={question.author.picture} alt="Profile Picture" className="profile-picture" />
            <h3 className='profile-author' style={{ marginLeft: '0.5rem' }}>{question.author.name}</h3>
          </div>
        </div>
        <div className='question-container'>
          <div className='question-content'>
            <h1>{question.title}</h1>
            <p>{question.text}</p>
            {question && question.selectedImages && question.selectedImages.map((image, index) => (
                <details className='image-details'>
                  <summary>
                    {image.name}
                  </summary>
                  <img className='question-image' src={image.data as string}/>
                </details>
            ))}
          </div>
        </div>
        <br/>

        {comments && comments.map((comment, index) => (
          <div key={index}>
            <div className='profile-container'>
              <div className='profile-info inline'>
                <img src={comment.author.picture} alt="Profile Picture" className="profile-picture" />
                <h3 className='profile-author' style={{ marginLeft: '0.5rem' }}>{comment.author.name}</h3>
              </div>
            </div>
            <div className='question-container'>
              <div className='question-content'>
                <p>{comment.content}</p>
                {comment && comment.selectedImages && comment.selectedImages.map((image, index) => (
                <details className='image-details'>
                  <summary>
                    {image.name}
                  </summary>
                  <img className='question-image' src={image.data as string}/>
                </details>
                ))}
              </div>
            </div>
          </div>
        ))}

        <br />
        <QuestionBluePrint enterTitle={false} qTitle='Add a Comment' submit={addComment} cancel={() => navigate(`/threads`)} />
      </div>
    </Page>
  );
};
