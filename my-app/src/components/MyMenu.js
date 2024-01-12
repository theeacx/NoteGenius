import React, {useEffect} from 'react';
import AddGroup from './AddGroup';
import '../components-style/MyMenu.css';
import AddSubject from './AddSubject';
import { useState } from 'react';
import axios from 'axios';

function MyMenu({ userID, updateSubjects, onSubjectSelect }) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleSubjectSelectLocal = (subjectID) => {
    setSelectedSubject(subjectID);
    onSubjectSelect(subjectID); 
  };


  const fetchSubjects = () => {
    axios.get('http://localhost:9000/api/subjects')
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
      <li className="menu-option home-button">Home</li>
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
        <select className="form-select" aria-label="Default select example" defaultValue="Tags">
          <option value="Tags">Tags</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
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
}

export default MyMenu;
