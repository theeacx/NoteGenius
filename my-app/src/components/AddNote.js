// AddNote.js

import React, { useState, useEffect } from 'react';
import '../components-style/AddNote.css';
import axios from 'axios';

function AddNote({ user, onNoteAdded }) {

  const [isFormVisible, setFormVisible] = useState(false);
  const [noteData, setNoteData] = useState({
    Title: '',
    Content: '',
    SubjectID: '',  // Assuming the backend expects 'SubjectID'
    UserID: '',   // Assuming you want to send the user ID to the backend
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

  const handleSubjectChange = (e) => {
    setNoteData({
      ...noteData,
      SubjectID: e.target.value,  // Changed to 'SubjectID' to match the state
    });
  };

  useEffect(() => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      UserID: user // Update UserID with the new user prop
    }));
  }, [user]); 

  const handleSaveNote = () => {
    console.log('Note Data:', noteData);
    axios.post('http://localhost:9000/api/note', noteData, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((response) => {
      console.log("Note created successfully:", response.data);
      // Call the onNoteAdded callback with the new note
      onNoteAdded(response.data.obj); // Assuming response.data.obj contains the new note
      // ... rest of your code ...
    })
    .catch((error) => {
      console.error("Error creating note:", error);
    });

  };

  return (
    <div className={`add-note-container ${isFormVisible ? 'open' : ''}`}>
      <button onClick={toggleFormVisibility}>Add Note</button>
      {isFormVisible && (
        <div className="note-form">
          <select 
            className="form-select" 
            aria-label="Default select example" 
            value={noteData.SubjectID} // Controlled component with value prop
            onChange={handleSubjectChange}
            name="SubjectID"
          >
            <option value="">Select Subject</option>  // Use empty string for unselected state
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <label htmlFor="noteTitle">Note Title:</label>
          <input
            type="text"
            id="noteTitle"
            name="Title"  // Name attribute matches the state key
            value={noteData.Title}
            onChange={handleInputChange}
            placeholder="Enter note title"
          />

          <label htmlFor="noteContent">Note Content:</label>
          <textarea
            id="noteContent"
            name="Content"  // Name attribute matches the state key
            value={noteData.Content}
            onChange={handleInputChange}
            placeholder="Enter note content"
          ></textarea>

          <button onClick={handleSaveNote}>Save Note</button>
        </div>
      )}
    </div>
  );
}

export default AddNote;


