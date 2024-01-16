import React, { useEffect, useState } from 'react';
import MyCard from './MyCard';
import MyMenu from './MyMenu';
import AddNote from './AddNote';
import NotePage from './NotePage';
import { Container, Col } from 'react-bootstrap';
import axios from 'axios';
import '../components-style/MainPage.css';

const MainPage = ({ userId }) => {
  const [personalNotes, setPersonalNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
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

  const handleSubjectSelect = (subjectID) => {
    const filteredBySubject = personalNotes.filter(
      (note) => note.SubjectID.toString() === subjectID
    );
    const filteredBySearch = filteredBySubject.filter((note) =>
      note.Title.toLowerCase().includes(searchQuery)
    );
    setFilteredNotes(filteredBySearch);
  };

  const handleDelete = async (noteID) => {
    try {
      const response = await axios.delete(
        `http://localhost:9000/api/note/${noteID}`
      );
      console.log('Note deleted:', response.data);
  
      const newNotes = personalNotes.filter(
        (note) => note.NoteID !== noteID
      );
      setPersonalNotes(newNotes);
  
      // Update filteredNotes as well
      setFilteredNotes(newNotes);
  
      if (selectedNote && selectedNote.NoteID === noteID) {
        setSelectedNote(null);
      }
    } catch (error) {
      console.error('Error during deleting the note:', error);
    }
  };
  

  const getNotesByUserId = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/note/noteUser/${id}`
      );
      console.log('Personal Notes:', response.data);
      setPersonalNotes(response.data);
      setFilteredNotes(response.data);
    } catch (error) {
      console.error(
        'Error during displaying the personal notes:',
        error
      );
      throw error;
    }
  };

  const addNewNote = (newNote) => {
    const updatedPersonalNotes = [...personalNotes, newNote];
    setPersonalNotes(updatedPersonalNotes);
  
    // Assuming no active filters, add the new note to filteredNotes as well
    setFilteredNotes(updatedPersonalNotes);
  };

  const handleCardClick = (note) => {
    setSelectedNote(note);
  };

  const handleNoteUpdated = (noteID, updatedData) => {
    const updatedNotes = personalNotes.map((note) =>
        note.NoteID === noteID ? { ...note, ...updatedData } : note
    );
    setPersonalNotes(updatedNotes);

    // Update filteredNotes as well if they include the edited note
    const updatedFilteredNotes = filteredNotes.map((note) =>
        note.NoteID === noteID ? { ...note, ...updatedData } : note
    );
    setFilteredNotes(updatedFilteredNotes);
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    setFilteredNotes(personalNotes);
    // Add other state variables that need to be reset
  };

  useEffect(() => {
    if (userId) {
      getNotesByUserId(userId);
    }
  }, [userId]);

  return (
    <React.Fragment>
      <Container fluid className="main-page-container">
        {selectedNote ? (
          <NotePage
            note={selectedNote}
            onClose={() => setSelectedNote(null)}
            onNoteUpdated={handleNoteUpdated}
          />
        ) : (
          <React.Fragment>
            <Col md={12} className="search-bar">
              <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Col>
            <Col md={12} className="add-card-button">
              <AddNote
                user={userId}
                onNoteAdded={addNewNote}
                funcSubjectChange={handleSubjectSelect}
              />
            </Col>
            <Col md={8} className="card-list">
              {filteredNotes
                .filter((note) => note && note.Title)
                .map((note) => (
                  <MyCard
                    key={note.NoteID}
                    title={note.Title}
                    content={note.Content}
                    userid={note.UserID}
                    subjectid={note.SubjectID}
                    groupid={1} // note.GroupID
                    tags={["imi", "e", "rau"]}
                    onDoubleClick={() =>
                      handleCardClick(note)
                    }
                    onDelete={() =>
                      handleDelete(note.NoteID)
                    }
                  />
                ))}
            </Col>
            <Col md={4} className="menu-column">
              <MyMenu
                userID={userId}
                onSubjectSelect={handleSubjectSelect}
                onHomeClick={handleHomeClick} // Pass the callback to reset filter
              />
            </Col>
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
};

export default MainPage;
