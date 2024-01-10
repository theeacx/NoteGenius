// AddNote.js

import React, { useState } from 'react';
import '../components-style/AddNote.css';

function AddNote() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    subject: '',
  });

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  };

  const handleSaveNote = () => {
    // save data logic
    console.log('Note Data:', noteData);

    setNoteData({
      title: '',
      content: '',
      subject: '',
    });
    setFormVisible(false);
  };

  return (
    <div className={`add-note-container ${isFormVisible ? 'open' : ''}`}>
      <button onClick={toggleFormVisibility}>Add Note</button>
      {isFormVisible && (
        <div className="note-form">
          <label htmlFor="noteTitle">Note Title:</label>
          <input
            type="text"
            id="noteTitle"
            name="title"
            value={noteData.title}
            onChange={handleInputChange}
            placeholder="Enter note title"
          />

          <label htmlFor="noteContent">Note Content:</label>
          <textarea
            id="noteContent"
            name="content"
            value={noteData.content}
            onChange={handleInputChange}
            placeholder="Enter note content"
          ></textarea>

          <label htmlFor="noteSubject">Note Subject:</label>
          <input
            type="text"
            id="noteSubject"
            name="subject"
            value={noteData.subject}
            onChange={handleInputChange}
            placeholder="Enter note subject"
          />

          <button onClick={handleSaveNote}>Save Note</button>
        </div>
      )}
    </div>
  );
}

export default AddNote;
