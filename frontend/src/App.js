import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import PostWish from './components/PostWish';

function App() {
  return (
    <React.Fragment>
      <div className='sticky-top'>
        <img
          src='navbar.jpg'
          className='sticky'
          style={{ width: '100vw', height: '80px' }}
          alt=''
        />
      </div>
      <PostWish />
    </React.Fragment>
  );
}

export default App;
