import React, { useEffect, useState } from "react";
import MyCard from "./MyCard";
import MyMenu from "./MyMenu";
import AddNote from "./AddNote";
import NotePage from "./NotePage";
import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import "../components-style/MainPage.css";

function MainPage({ userId }) {
  const [personalNotes, setPersonalNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null); // Track the selected note

  const [subjectData, setSubjectData] = useState(null);

  const [group, setGroupId] = useState(null);

  const updateSubjects = () => {
    axios.get('http://localhost:9000/api/subjects')
      .then((response) => {
        setSubjectData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
      });
  };

  const handleDelete = async (noteID) => {
    try {
      const response = await axios.delete(`http://localhost:9000/api/note/${noteID}`);
      console.log('Note deleted:', response.data);
      //delete the note from the list of notes
      const newNotes = personalNotes.filter((note) => note.NoteID !== noteID);
      setPersonalNotes(newNotes);

      // Clear the selected note if it's deleted
      if (selectedNote && selectedNote.NoteID === noteID) {
        setSelectedNote(null);
      }
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

  const addNewNote = (newNote) => {
    // Add the new note to the personalNotes state
    setPersonalNotes([...personalNotes, newNote]);
  };

  const handleCardClick = (note) => {
    // Set the selectedNote state to the clicked note
    setSelectedNote(note);
  };

  useEffect(() => {
    if (userId) {
      getNotesByUserId(userId);
    }
  }, [userId]);

  console.log("MainPage userId:", userId);

  const handleSubjectChange = (e) => {
    setSubjectData({
      ...subjectData,
      SubjectID: e.target.value, 
    });
  }

  return (
    <React.Fragment>
      <Container fluid className="main-page-container">
        {selectedNote ? ( // Render NotePage if a note is selected
          <NotePage note={selectedNote} onClose={() => setSelectedNote(null)} />
        ) : (
          // Otherwise, render the list of cards
          <Row>
            {/* Search Bar */}
            <Col md={12} className="search-bar">
              <input type="text" placeholder="search by title" />
            </Col>
            {/* Add card button */}
            <Col md={12} className="add-card-button">
              <AddNote user={userId} onNoteAdded={addNewNote} funcSubjectChange={handleSubjectChange} />
            </Col>
            {/* List of Cards */}
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
                    tags={['Tag1', 'Tag2', 'Tag3']}
                    onClick={() => handleCardClick(note)}
                    onDelete={() => handleDelete(note.NoteID)}
                  />
                ))}
              </Row>
            </Col>
            {/* Menu */}
            <Col md={4} className="menu-column">
            <MyMenu userID={userId} updateSubjects={updateSubjects} />
            </Col>
          </Row>
        )}
      </Container>
    </React.Fragment>
  );
}

export default MainPage;
