import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostWish from './components/PostWish';
import navbar from './assets/navbar.jpg';

function App() {
  return (
    <React.Fragment>
      <div className='sticky-top'>
        <img
          src={navbar}
          className='sticky'
          style={{ width: '100%', height: '80px' }}
          alt=''
        />
      </div>
      <PostWish />
    </React.Fragment>
  );
}

export default App;
