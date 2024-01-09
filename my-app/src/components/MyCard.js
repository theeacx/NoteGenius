import React from 'react';
import { Card } from 'react-bootstrap';
import MyTag from './MyTag';
import '../components-style/MyCard.css';
import axios from 'axios';

function MyCard(props) {
  const { noteTitle, content, user, subject, group, onClick, tags } = props;

  

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
        <Card.Title >{noteTitle}</Card.Title>
        <Card.Text >{user}</Card.Text>        
        <Card.Text >{subject}</Card.Text>
        <Card.Text >{user}</Card.Text>
        <div>
          {tags.map((tag, index) => (
            <MyTag key={index} text={tag} color={getTagColor(tag)} />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
