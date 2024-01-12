// AddSubject.js

import React, { useState, useEffect } from 'react'; 
import '../components-style/AddSubject.css';
import axios from 'axios';

function AddSubject({ user, onSubjectAdded, updateSubjects }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [subjectData, setSubjectData] = useState({
    SubjectName: '',
    UserID: '', 
  });

  useEffect(() => {
    if (user) {
      setSubjectData(prevSubjectData => ({
        ...prevSubjectData,
        UserID: user 
      }));
    }
  }, [user]);


  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };


  const handleSaveSubject = () => {
    console.log('Subject Data:', subjectData);
    axios.post('http://localhost:9000/api/subject', subjectData, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      console.log("Subject created successfully:", response.data);
      if (typeof onSubjectAdded === 'function') {
        onSubjectAdded(response.data.obj);
      }
      // If the updateSubjects function is provided, call it to update the subjects
      if (typeof updateSubjects === 'function') {
        updateSubjects();
      }
      // This will hide the form after the subject is saved
      toggleFormVisibility();
      // Reset the subject data state if needed
      setSubjectData({
        SubjectName: '',
        UserID: user 
      });
    })
    .catch((error) => {
      console.error("Error creating subject:", error);
    });
  };
  
  return (
    <div className={`add-subject-container ${isFormVisible ? 'open' : ''}`}>
      <button onClick={toggleFormVisibility}>Add Subject</button>
      {isFormVisible && (
        <div className="subject-form">
          <label htmlFor="newSubject">New Subject:</label>
          <input
            type="text"
            id="newSubject"
            value={subjectData.SubjectName}
            onChange={e => setSubjectData({ ...subjectData, SubjectName: e.target.value })}
            placeholder="Enter new subject"
          />
          <button onClick={handleSaveSubject}>Save Subject</button>
        </div>
      )}
    </div>
  );
}

AddSubject.defaultProps = {
  onSubjectAdded: () => {}, 
};

export default AddSubject;
