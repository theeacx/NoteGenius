import React, { useEffect, useState } from 'react';
import { Container, Col } from 'react-bootstrap';
import axios from 'axios';
import MyCard from './MyCard';
import MyMenu from './MyMenu';
import AddNote from './AddNote';
import NotePage from './NotePage';
import '../components-style/MainPage.css';
import '../components-style/TagSelectionPopup.css'; 

const MainPage = ({ userId }) => {
  const [personalNotes, setPersonalNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const fetchAllTags = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/notes`);
      const tagsMap = {};

      response.data.forEach((note) => {
        const noteId = note.NoteID;
        const tags = note.Tags.map((tag) => tag.TagName);
        tagsMap[noteId] = tags;
      });

      console.log('Tags:', tagsMap);
      setTags(tagsMap);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/subjects/${userId}`);
      setSubjects(response.data);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = personalNotes.filter((note) =>
      note.Title.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
  };

  const handleSubjectTagFilter = (subjectID, selectedTag) => {
    const filteredBySubject = personalNotes.filter(
      (note) => note.SubjectID.toString() === subjectID
    );

    let filteredNotes = filteredBySubject;

    if (selectedTag) {
      // If a tag is selected, further filter by the tag
      filteredNotes = filteredBySubject.filter((note) =>
        tags[note.NoteID]?.includes(selectedTag)
      );
    }

    const filteredBySearch = filteredNotes.filter((note) =>
      note.Title.toLowerCase().includes(searchQuery)
    );

    setFilteredNotes(filteredBySearch);
  };

  const handleTagSelect = (selectedTag) => {
    // Update the selected tag
    setSelectedTag(selectedTag);
    // Filter notes based on the selected tag and subject
    handleSubjectTagFilter(selectedSubject, selectedTag);
  };

  const handleSubjectSelect = (subjectID) => {
    // Set the selected subject and filter notes based on the selected subject and tag
    setSelectedSubject(subjectID);
    handleSubjectTagFilter(subjectID, selectedTag);
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

    const updatedFilteredNotes = filteredNotes.map((note) =>
      note.NoteID === noteID ? { ...note, ...updatedData } : note
    );
    setFilteredNotes(updatedFilteredNotes);
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setFilteredNotes(personalNotes);
  };

  useEffect(() => {
    if (userId) {
      getNotesByUserId(userId);
      fetchAllTags();
      fetchSubjects();
    }
  }, [userId]);


  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        await getNotesByUserId(userId);
        await fetchAllTags();
        await fetchSubjects();
      }
    };
  
    fetchData();
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
                subjects={subjects}
                onTagSelect={handleTagSelect}
                selectedTag={selectedTag} // Pass the selected tag to AddNote
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
                    tags={tags[note.NoteID] || []}
                    selectedTag={selectedTag} // Pass the selected tag to MyCard
                    onDoubleClick={() =>
                      handleCardClick(note)
                    }
                    onDelete={() =>
                      handleDelete(note.NoteID)
                    }
                    onTagsUpdate={(updatedTags) =>
                      setTags((prevTags) => ({
                        ...prevTags,
                        [note.NoteID]: updatedTags,
                      }))
                    }
                  />
                ))}
            </Col>
            <Col md={4} className="menu-column">
              <MyMenu
                userID={userId}
                onSubjectSelect={handleSubjectSelect}
                onHomeClick={handleHomeClick}
                updateSubjects={fetchSubjects}
                onTagSelect={handleTagSelect}
              />
            </Col>
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  );
};

export default MainPage;
