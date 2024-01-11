import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import MyTag from './MyTag';
import '../components-style/MyCard.css';
import axios from 'axios';

function MyCard(props) {
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
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/user/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error during displaying the personal notes:', error);
      throw error;
    }
  };

  const handleViewClick = () => {
    if (typeof props.onDoubleClick === 'function') {
      props.onDoubleClick(props.noteID);
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    if (typeof props.onDelete === 'function') {
      props.onDelete();
    }
  };

  useEffect(() => {
    if (props.userid) {
      getUserById(props.userid);
    }

    if (props.subjectid) {
      getSubjectById(props.subjectid);
    }
  }, [props.userid, props.subjectid]);

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
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {user && <Card.Text>{user.FirstName} {user.LastName}</Card.Text>}
        {subject && <Card.Text>{subject.SubjectName}</Card.Text>}

        <div>
          {props.tags.map((tag, index) => (
            <MyTag key={index} text={tag} color={getTagColor(tag)} />
          ))}
        </div>

        <button id="viewButton" onClick={handleViewClick}>
          View
        </button>
        <button id="deleteButton" onClick={handleDeleteClick}>
          Delete
        </button>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
