import { filterRepo } from "frontend/components/threads/logic/filter-repository";
import React from "react";
import { AutoWidthDiv } from "frontend/components/AutoDivParagraph";
import LabelRenderer from "../label/labels-renderer";

import "./filter-display.css"

const FilterDisplay: React.FC = () => {

  const str = "Author: " + filterRepo.account;

  return (
    <div className="inline">
    {filterRepo.account !== "" &&  
      <AutoWidthDiv text={str} clas="author-filter" />
    }

    {filterRepo.labels.length !== 0 &&
      <LabelRenderer selectedItems={filterRepo.labels}/>
    }

    </div>
  );
};

export default FilterDisplay;


