import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import MyTag from './MyTag';
import '../components-style/MyCard.css';
import axios from 'axios';
import TagSelectionPopup from './TagSelectionPopup'; 

function MyCard(props) {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);
  const [isTagSelectionOpen, setIsTagSelectionOpen] = useState(false); 
  const [selectedTags, setSelectedTags] = useState(props.tags);
  const [tagDetails, setTagDetails] = useState({});

  const fetchTagDetails = async () => {
    try {
      // Replace with your actual API endpoint to fetch tag details
      const response = await axios.get('http://localhost:9000/api/tags');
      setTagDetails(response.data);
    } catch (error) {
      console.error('Error fetching tag details:', error);
    }
  };


  const getSubjectById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/subject/${id}`);
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

  const updateTagsInBackend = async (noteId, tags) => {
    try {
      await axios.put(`http://localhost:9000/note/${noteId}/tagsUpdate`, { tags });
    } catch (error) {
      console.error('Error during updating the tags for the note:', error);
    }
  };


  const handleTagSelection = async(selectedTags) => {
    console.log("Selected Tags (IDs):", selectedTags); // Debugging line

    // Update the tags for the current card in the backend
    await updateTagsInBackend(props.note.NoteID, selectedTags);
  
    // Close the tag selection pop-up
    setIsTagSelectionOpen(false);
  
    // Update the selected tags in state
    setSelectedTags(selectedTags);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTagDetails();
      if (props.userid) {
        await getUserById(props.userid);
      }
      if (props.subjectid) {
        await getSubjectById(props.subjectid);
      }
    };
    fetchData();
    setSelectedTags(props.tags);
  }, [props.userid, props.subjectid, props.tags]); 

  const getTagColor = (tagName) => {
    const tagColors = {
      'important': '#0074D9',
      'for exam': '#7FDBFF',
      'study': '#2ECC40',
      'programming': '#FFDC00',
      'mathematics': '#FF851B',
      'cybernetics': '#FF4136',
      'year1': '#B10DC9',
      'year2': '#F012BE',
      'year3': '#85144b',
      'economics': '#AAAAAA',
      'statistics': '#DDDDDD',
      'imi': '#111111',
      'e': '#01FF70',
      'rau': '#AAAAAA',
    };

    return tagColors[tagName] || 'transparent';
  };

  const getTagNameById = (tagId) => {
    const tagName = tagDetails[tagId]?.TagName || 'Unknown Tag';
    console.log(`Tag ID: ${tagId}, Tag Name: ${tagName}`); // Debugging line
    return tagName;
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {user && <Card.Text>{user.FirstName} {user.LastName}</Card.Text>}
        {subject && <Card.Text>{subject.SubjectName}</Card.Text>}
        {selectedTags.map((tagId, index) => (
          <MyTag key={index} text={getTagNameById(tagId)} color={getTagColor(getTagNameById(tagId))} />
        ))}

        <button id="addTagButton" onClick={() => setIsTagSelectionOpen(true)}>
          Select Tag
        </button>

        {isTagSelectionOpen && (
          <TagSelectionPopup
            selectedNoteID={props.note.NoteID}
            existingTags={selectedTags}
            onSelectTags={(selectedTagIds) => handleTagSelection(selectedTagIds)}
            onClose={() => setIsTagSelectionOpen(false)}
          />
        )}

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
