import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './vote.css';
import { Question } from '@components/threads/logic/model';

interface VoteComponentProps {
  question: Question;
}

const VoteComponent: React.FC<VoteComponentProps> = ({ question }) => {

    const [render, setRender] = useState(false);

    const handleUpVote = () => {
        question.votes++;
        setRender(!render);
    };
    
    const handleDownVote = () => {
        question.votes--;
        setRender(!render);
    };
    
    return (
        <div className="vote-component vote-pos">
          <button className="vote-button" onClick={handleUpVote}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <div className="vote-count">{question.votes}</div>
          <button className="vote-button" onClick={handleDownVote}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
    );
};

export default VoteComponent;
