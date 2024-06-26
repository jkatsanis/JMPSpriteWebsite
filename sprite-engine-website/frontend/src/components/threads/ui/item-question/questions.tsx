import React, { useState } from 'react';
import { NewQuestionButton } from '../new-question/new-question';
import FilterQuestionButton from './filter/filter-question-button';
import { QuestionSearchLogic } from './list/question-search-logic';
import FilterDisplay from './filter/display/filter-display';

import "components/threads/ui/item-question/item/question.css"
import "components/threads/ui/new-question/new-question.css"
import "utils/general.css"

const RenderQuestions = () => {
  const [render, setRender] = useState(false);

  const updateFilter = () => {
    setRender(!render);
  }

  return (
    <div>
      <div className='inline'>
        <h1 className='common'>Questions: </h1>
        <div style={{ position: 'relative', left: '41rem' }}>
          <FilterQuestionButton updateFilter={updateFilter}/>
          <NewQuestionButton />
        </div>
      </div>
      <div className='h-1'/>
      <FilterDisplay/>
      <div className='h-1'/>

      <QuestionSearchLogic filter={render}/>
    </div>
  );
};

export default RenderQuestions;
