import React, { useState } from 'react';
import SearchComponent from '../../utils/search/search';
import EditorDocs from './engine/docs-editor';
import { Page } from '../page';
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
              <h3>Any questions? Discord: gameengine</h3>
              <div className='h-2' />


              <SearchComponent id="feature-searcher" handleEnterPress={handleEnterPress} search={search} searchFor='Search for docs...'/>
              <NavigationFrame />

              <div id='scroll-to-me' /> {/* This gets scrolled to from search component when pressing enter & focused */}

              <button className='collapse-btn default-btn' onClick={collapse}>
                Collapse All
              </button>
              <div className='h-2'/>

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
