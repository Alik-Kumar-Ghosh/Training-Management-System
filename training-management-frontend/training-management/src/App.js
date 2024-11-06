
import React from 'react';
import Routes from './routes';
import axios from 'axios';

function App() {

  axios.defaults.withCredentials = true;
  return (
      <div className="App">
        <Routes/>
        
      </div>
    
  );
}

export default App;

