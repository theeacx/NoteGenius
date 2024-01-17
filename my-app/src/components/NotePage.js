import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components-style/NotePage.css';

function formatContent(content) {
    if (typeof content !== 'string') {
      console.error('Content is not a string:', content);
      return content;
    }
  
    const styleMapping = {
      h1: 'color: #ca99ff; font-size: 24px; font-weight: bold;',
      h2: 'color: #a3b6ff; font-size: 20px; font-weight: bold;',
      p: 'font-size: 16px; color: white; line-height: 1.5;',
      strong: 'font-weight: bold; color: #4b0082;',
      em: 'font-style: italic; color: #1e90ff;',
      u: 'text-decoration: underline; color: #9400d3;',
    };
  
    const formattedContent = content.replace(/<(\w+)>/g, (match, tag) => {
      const style = styleMapping[tag.toLowerCase()] || '';
      return `<${tag} style="${style}">`;
    });
  
    return formattedContent;
  }

function NotePage({ note, onClose, onNoteUpdated }) {
  const [editMode, setEditMode] = useState(false);
  const [noteData, setNoteData] = useState({
    Title: '',
    Content: '',
    SubjectID: '',
    SubjectName: '',
  });

  const handleEditNote = () => {
    axios
      .put(`http://localhost:9000/api/note/${note.NoteID}`, noteData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('Note updated successfully:', response.data);
        setEditMode(false);
        onNoteUpdated(note.NoteID, noteData);
      })
      .catch((error) => {
        console.error('Error updating note:', error);
      });
  };

  useEffect(() => {
    if (note) {
      setNoteData({
        Title: note.Title,
        Content: note.Content,
        SubjectID: note.SubjectID,
      });
      fetchSubjectName(note.SubjectID);
    }
  }, [note]);

  const fetchSubjectName = (subjectID) => {
    axios
      .get(`http://localhost:9000/api/subject/${subjectID}`)
      .then((response) => {
        setNoteData((prevNoteData) => ({
          ...prevNoteData,
          SubjectName: response.data.SubjectName,
        }));
      })
      .catch((error) => {
        console.error('Error fetching subject name:', error);
      });
  };

  const handleTitleChange = (e) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      Title: e.target.value,
    }));
  };

  const handleContentChange = (e) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      Content: e.target.value,
    }));
  };

  const handleShareViaEmail = () => {
    const subject = encodeURIComponent(noteData.SubjectName || noteData.SubjectID);
    const body = encodeURIComponent(`${noteData.Title}\n\n${noteData.Content}`);

    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="note-page-container">
      <div className="note-page-edit-button">
        {editMode ? (
          <button onClick={handleEditNote}>Save</button>
        ) : (
          <>
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={handleShareViaEmail}>Share via Email</button>
          </>
        )}
      </div>
      <div className="note-page-content-container">
        {editMode ? (
          <>
            <input
              type="text"
              value={noteData.Title}
              onChange={handleTitleChange}
            />
            <input
              type="text"
              value={noteData.Content}
              onChange={handleContentChange}
            />
          </>
        ) : (
          <>
            <h1 dangerouslySetInnerHTML={{ __html: formatContent(noteData.Title) }} />
            <h2 dangerouslySetInnerHTML={{ __html: formatContent(noteData.SubjectName || noteData.SubjectID) }} />
            <div
              className="note-page-content"
              dangerouslySetInnerHTML={{ __html: formatContent(noteData.Content) }}
            />
          </>
        )}
      </div>
      <div className="note-page-back-button">
        <button onClick={onClose}>Back</button>
      </div>
    </div>
  );
}

export default NotePage;