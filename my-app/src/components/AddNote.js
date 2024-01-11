import React, { useState, useEffect } from 'react';
import '../components-style/AddNote.css';
import axios from 'axios';

function AddNote({ user, onNoteAdded, funcSubjectChange }) {

  const [isFormVisible, setFormVisible] = useState(false);
  const [noteData, setNoteData] = useState({
    Title: '',
    Content: '',
    SubjectID: '',  
    UserID: '',   
  });

  const [subjects, setSubjects] = useState([]);
  const[tag, setTag] = useState([]);

  const addNewNote = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/note', noteData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log("Note created successfully:", response.data);

      // Update the local state
      setNoteData({
        Title: '',
        Content: '',
        SubjectID: '',
        UserID: user,
      });

      // Trigger the callback after the state has been updated
      onNoteAdded(response.data.obj);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };


  useEffect(() => {
    axios.get('http://localhost:9000/api/subjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
    axios.get('http://localhost:9000/api/tags')
      .then((response) => {
        setTag(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  }, [funcSubjectChange]);

  // useEffect(() => {
   
  // });


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
      SubjectID: e.target.value,  
    });
  };

  useEffect(() => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      UserID: user 
    }));
  }, [user]); 



  const handleSaveNote = () => {
    console.log('Note Data:', noteData);
    axios.post('http://localhost:9000/api/note', noteData, {
      headers: {'Content-Type': 'application/json'},
    })
    .then((response) => {
      console.log("Note created successfully:", response.data);
      onNoteAdded(response.data.obj); 
      setNoteData({
        Title: '',
        Content: '',
        SubjectID: '',
        UserID: '',
      });
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
           <label htmlFor="subjectSelect">Select Subject:</label>
          <select
            id="subjectSelect"
            className="form-select"
            aria-label="Default select example"
            value={noteData.SubjectID}
            onChange={handleSubjectChange}
            name="SubjectID"
          >
            <option value="">Select Subject</option>
           
            {subjects.map((subject) => (
              <option key={subject.SubjectID} value={subject.SubjectID}>
                {subject.SubjectName}
              </option>
            ))}
          </select>

          <label htmlFor="tagSelect">Select Tag:</label>
          <select
          id="tagSelect"
          className="form-select"
          aria-label="Default select example"
          value=""
          name="TagID"
        >
          <option value="">Select Tag</option>
          {tag.map((tag) => (
            <option key={tag.TagID} value={tag.TagID}>
              {tag.TagName}
            </option>
          ))}
          
        </select>

          <label htmlFor="noteTitle">Note Title:</label>
          <input
            type="text"
            id="noteTitle"
            name="Title"  
            value={noteData.Title}
            onChange={handleInputChange}
            placeholder="Enter note title"
          />

          <label htmlFor="noteContent">Note Content:</label>
          <textarea
            id="noteContent"
            name="Content"  
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
