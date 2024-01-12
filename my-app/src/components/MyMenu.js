import React, { useEffect } from 'react';
import AddGroup from './AddGroup';
import '../components-style/MyMenu.css';
import AddSubject from './AddSubject';
import { useState } from 'react';
import axios from 'axios';

const MyMenu = ({ userID, updateSubjects, onSubjectSelect, onHomeClick }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchTags();
  }, [selectedSubject]);

  const handleSubjectSelectLocal = (subjectID) => {
    setSelectedSubject(subjectID);
    onSubjectSelect(subjectID);
  };

  const handleHomeClick = () => {
    setSelectedSubject('');
    // Add other state variables that need to be reset

    // Call the onHomeClick callback if provided
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const fetchTags = () => {
    axios
      .get('http://localhost:9000/api/tags')
      .then((response) => {
        setTags(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
      });
  };

  const fetchSubjects = () => {
    axios
      .get('http://localhost:9000/api/subjects')
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  };

  return (
    <div className="menu-container">
      <h3 className="menu-title">Menu</h3>
      <input type="text" placeholder="Search.." name="search" className="menu-search" />
      <ul className="menu-options">
        <li className="menu-option home-button" onClick={handleHomeClick}>Home</li>
        <label htmlFor="subjectSelect">Subjects</label>
      <select
        id="subjectSelect"
        className="form-select"
        aria-label="Default select example"
        value={selectedSubject}
        onChange={(e) => handleSubjectSelectLocal(e.target.value)} 
      >
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject.SubjectID} value={subject.SubjectID}>
          {subject.SubjectName}
        </option>
        ))}
      </select>
        <AddSubject user={userID} updateSubjects={updateSubjects} />
        <select 
          className="form-select" 
          aria-label="Default select example" 
          defaultValue="Tags"
          onChange={fetchTags}
        >
          <option value="Tags">Tags</option>
          {tags.map((tag) => (
            <option key={tag.TagID} value={tag.TagID}>
              {tag.TagName}
            </option>
          ))}
        </select>
        
        <select className="form-select" aria-label="Default select example" defaultValue="Groups">
          <option value="Groups">Groups</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <AddGroup />
      </ul>
      <select className="form-select" aria-label="Default select example" defaultValue="See Groups">
          <option value="SeeGroups">See Groups</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
    </div>
  );
};

export default MyMenu;
