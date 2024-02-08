import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import TopBar from 'components/Topbar/TopBar'


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
