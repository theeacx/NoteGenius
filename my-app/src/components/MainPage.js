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
  const [selectedNote, setSelectedNote] = useState(null); 
  const [subjectData, setSubjectData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = personalNotes.filter((note) =>
      note.Title.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
  };

  // const handleSubjectChange = (subjectID) => {
  //   const newFilteredNotes = personalNotes.filter((note) => note.SubjectID === subjectID);
  //   setFilteredNotes(newFilteredNotes);
  // };

  const handleSubjectSelect = (subjectID) => {
    const filteredBySubject = personalNotes.filter((note) => note.SubjectID === subjectID);
    const filteredBySearch = filteredBySubject.filter((note) =>
      note.Title.toLowerCase().includes(searchQuery)
    );
    setFilteredNotes(filteredBySearch);
  };


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

      const newNotes = personalNotes.filter((note) => note.NoteID !== noteID);
      setPersonalNotes(newNotes);

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
      setFilteredNotes(response.data);
    } catch (error) {
      console.error('Error during displaying the personal notes:', error);
      throw error;
    }
  };

  const addNewNote = (newNote) => {
    setPersonalNotes([...personalNotes, newNote]);
  };

  const handleCardClick = (note) => {
    setSelectedNote(note);
  };

  useEffect(() => {
    if (userId) {
      getNotesByUserId(userId);
    }
  }, [userId]);

  console.log("MainPage userId:", userId);

  return (
    <React.Fragment>
      <Container fluid className="main-page-container">
        {selectedNote ? (
          <NotePage note={selectedNote} onClose={() => setSelectedNote(null)} />
        ) : (
          <Row>
            <Col md={12} className="search-bar">
              <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={12} className="add-card-button">
              <AddNote user={userId} onNoteAdded={addNewNote} funcSubjectChange={handleSubjectSelect} />
            </Col>
            <Col md={8} className="card-list">
              <Row>
                {filteredNotes.map((note) => (
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
            <Col md={4} className="menu-column">
            <MyMenu userID={userId} updateSubjects={updateSubjects} onSubjectSelect={handleSubjectSelect} />
            </Col>
          </Row>
        )}
      </Container>
    </React.Fragment>
  );
}


export default MainPage;
