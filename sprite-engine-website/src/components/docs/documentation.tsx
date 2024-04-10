import React, { useState } from 'react';
import SearchComponent from '../../utils/search/search';
import EditorDocs from './engine/docs-editor';
import { Page } from 'components/page';
import DocsComponent from './components/docs-components';
import Namespace from './namespace/docs-namespace';
import NavigationFrame from './navigation/navigation-frames';
import ContentTable from './navigation/content-table';

import { handleEnterPress, search, collapse } from './navigation/search-docs';

import 'components/bottom/bottom.css';
import './documentation.css';
import 'utils/general.css';


interface DocuProps {}

const Docu: React.FC<DocuProps> = () => {
  return (
    <Page>
      <div className='docs'>
        <ContentTable />
        <div className='content'>
          <div className='centered-div-content-left-60'>
            <div>
              <div className='h-3' />
              <h3>Any questions?</h3>
              <hr />
              <p>
                Feel free to connect with us on Discord using the username <b>gameengine</b> for any queries or assistance. I'm always happy to help :=)
              </p>
              <div className='h-3' />
              <h3>Welcome</h3>
              <hr />
              <p>
                Welcome to the SpriteEngine documentation! Whether you're a beginner or an experienced developer, this page is designed to provide you with comprehensive guides and references for utilizing the SpriteEngine in your 2D game development projects.
              </p>
              <div className='h-3' />

              <SearchComponent id="feature-searcher" handleEnterPress={handleEnterPress} search={search} searchFor='Search for docs...'/>
              <NavigationFrame />

              <div id='scroll-to-me' /> {/* This gets scrolled to from search component when pressing enter & focused */}

              <button className='collapse-btn default-btn' onClick={collapse}>
                Collapse All
              </button>

              <EditorDocs />
              <DocsComponent />
              <Namespace />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Docu;
