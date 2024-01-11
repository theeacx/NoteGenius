//NotePage.js

import React, { useState, useEffect } from 'react';
import '../components-style/NotePage.css';
import MyCard from './MyCard';
import axios from 'axios';
import MainPage from './MainPage';

function NotePage({ note, onClose }) {
    const [noteData, setNoteData] = useState({
        title: '',
        content: '',
        subject: '',
    });

    useEffect(() => {
        if (note) {
            console.log("Note:", note);
            setNoteData(note);
        }
    }, [note]);

    return (
        <div className="note-page-container">
        <div className="note-page-cards">
          <h1>{noteData.Title}</h1>
          <h2>{noteData.SubjectID}</h2> {/* Replace with subject name when available */}
          <div className="note-page-content">
            <p>{noteData.Content}</p>
          </div>
        </div>
        <div className="note-page-back-button">
          <button onClick={onClose}>Back</button>
        </div>
      </div>
      
    );
  }
  
  export default NotePage;
