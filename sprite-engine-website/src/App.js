import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import TopBar from 'components/topbar/topbar'

import "utils/general.css"

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
      </div>
    </Router>
  );
}

export default App;
