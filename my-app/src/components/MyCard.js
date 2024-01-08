import React from 'react';
import { Card } from 'react-bootstrap';

function MyCard ({ title, content, onClick }) {
  const cardStyle = {
    width: '18rem',
    margin: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#333', 
    color: 'white', 
  };

  return (
    <Card style={cardStyle}>
      {/* <Card.Img variant="top" src="your-image-url.jpg" alt="Card Image" /> Replace with your image URL */}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
        <Card.Link href="#" onClick={onClick} style={{ color: 'white' }}>
          Click me
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default MyCard;
