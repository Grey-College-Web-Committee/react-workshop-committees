import React, { useEffect } from 'react';
import "./App.css";
import { CommitteePage } from './pages/CommitteePage';

export const App = () => {
  useEffect(() => {
    document.title = "React Workshop: Profile Boxes"
  }, []); 

  return (
    <div>
      <div className="banner">
        React Workshop: Profile Boxes
      </div>
      <div className="core-container">
        <CommitteePage />
      </div>
    </div>
  )
}

