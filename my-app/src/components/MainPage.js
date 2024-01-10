import React, { useEffect, useState } from "react";
import MyCard from "./MyCard";
import MyMenu from "./MyMenu";
import AddNote from "./AddNote";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import "../components-style/MainPage.css";

function MainPage({ userId }) {
  const [personalNotes, setPersonalNotes] = useState([]);

  const [group, setGroupId] = useState(null);

  const handleDelete = async (noteID) => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/note/${noteID}`);
      console.log('Note deleted:', response.data);
      
      //delete the note from the list of notes
      const newNotes = personalNotes.filter((note) => note.NoteID !== noteID);
      setPersonalNotes(newNotes);


    } catch (error) {
      console.error('Error during deleting the note:', error);
      
    }
  };


  const getNotesByUserId = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/note/noteUser/${id}`);
      console.log('Personal Notes:', response.data);
      setPersonalNotes(response.data);
    } catch (error) {
      console.error('Error during displaying the personal notes:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (userId) {
      getNotesByUserId(userId);
    }
  }, [userId]);

  return (
    <React.Fragment>
      <Container fluid className="main-page-container">
        <Row>
          {/* Search Bar */}
          <Col md={12} className="search-bar">
            <input type="text" placeholder="search by title" />
          </Col>
          {/*Add card button */}
          <Col md={12} className="add-card-button">
            {/* <button>Add New Note</button> */}
            <AddNote />
          </Col>
        </Row>
        <Row>
          {/*List of Cards */}
          <Col md={8} className="card-list">
            <Row>
              {personalNotes.map((note) => (
                <MyCard
                  key={note.NoteID}
                  title={note.Title}
                  content={note.Content}
                  userid={note.UserID}
                  subjectid={note.SubjectID}
                  groupid={1} // note.GroupID
                  tags = {['Tag1', 'Tag2', 'Tag3']}
                  onClick={() => console.log(`Card ${note.id} clicked`)}
                  onDelete={() => handleDelete(note.NoteID)}
                />
              ))}
            </Row>
          </Col>

          {/* Menu */}
          <Col md={4} className="menu-column">
            <MyMenu />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default MainPage;
