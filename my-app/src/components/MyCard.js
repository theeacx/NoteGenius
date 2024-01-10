import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import MyTag from './MyTag';
import '../components-style/MyCard.css';
import axios from 'axios';

function MyCard(props) {
  const { title, content, userid, subjectid, groupid, onClick, onDelete, tags } = props;
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);



  const getSubjectById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/subject/${id}`);
      console.log('Subject:', response.data);
      setSubject(response.data); 
    } catch (error) {
      console.error('Error during displaying the personal notes:', error);
      throw error;
    }
  }

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/user/${id}`);
      // console.log('User:', response.data);
      setUser(response.data); 
    } catch (error) {
      console.error('Error during displaying the personal notes:', error);
      throw error;

    }
  }

  //when i press the delete button i want to delete the note from the database
  // const deleteNote = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:9000/api/note/${id}`);
  //     console.log('Note deleted:', response.data);
  //   } catch (error) {
  //     console.error('Error during deleting the note:', error);
  //     throw error;
  //   }
  // }
  
  //create a new note based on the data from the form
  // const createNote = async (note) => {
  //   try {
  //     const response = await axios.post('http://localhost:9000/api/note/', note, {
  //       headers: {'Content-Type': 'application/json'},
  //     })
  //     console.log("Note created successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error creating note:", error);
  //   }
  // }

  useEffect(() => {
    if (userid) {
      getUserById(userid);
    }

    if (subjectid) {
      getSubjectById(subjectid);
    }
  }, [userid, subjectid]);

  const getTagColor = (tagName) => {
    const tagColors = {
      'Tag1': '#0074D9',
      'Tag2': '#7FDBFF',
      'Tag3': '#2ECC40',
      'Tag4': '#FFDC00',
      'Tag5': '#FF851B',
      'Tag6': '#FF4136',
      'Tag7': '#B10DC9',
      'Tag8': '#F012BE',
      'Tag9': '#85144b',
    };

    return tagColors[tagName] || 'transparent';
  };

  return ( 
    <Card onClick={onClick}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {user && <Card.Text>{user.FirstName} {user.LastName}</Card.Text>}
        {subject && <Card.Text>{subject.SubjectName}</Card.Text>}

        <div>
          {tags.map((tag, index) => (
            <MyTag key={index} text={tag} color={getTagColor(tag)} />
          ))}
        </div>
        <button id="deleteButton" onClick={onDelete}>Delete</button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
