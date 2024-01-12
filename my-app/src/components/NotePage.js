import React, { useState, useEffect } from 'react';
import '../components-style/NotePage.css';
import axios from 'axios';

function NotePage({ note, onClose }) {
    const [noteData, setNoteData] = useState({
        Title: '',
        Content: '',
        SubjectID: '',
        SubjectName: '', // Add a field to store the subject name
    });

    useEffect(() => {
        if (note) {
            setNoteData({
              Title: note.Title,
              Content: note.Content,
              SubjectID: note.SubjectID,
            });
            // Fetch the subject name from the backend
            fetchSubjectName(note.SubjectID);
        }
    }, [note]);

    const fetchSubjectName = (subjectID) => {
        // Replace with the actual endpoint you have for fetching a single subject
        axios.get(`http://localhost:9000/api/subject/${subjectID}`)
            .then(response => {
                // Assuming the response has a subject object with a SubjectName property
                setNoteData(prevNoteData => ({
                    ...prevNoteData,
                    SubjectName: response.data.SubjectName,
                }));
            })
            .catch(error => {
                console.error('Error fetching subject name:', error);
            });
    };

    return (
        <div className="note-page-container">
            <div className="note-page-cards">
                <h1>{noteData.Title}</h1>
                <h2>{noteData.SubjectName || noteData.SubjectID}</h2>
                <div className="note-page-content">
                    <p>{noteData.Content}</p>
                </div>
            </div>
            <div className="note-page-back-button">
                <button onClick={onClose}>Back</button>
            </div>
        </div>
    );
}

export default NotePage;
