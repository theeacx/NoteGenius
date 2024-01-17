import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components-style/TagSelectionPopup.css';

const TagSelectionPopup = ({ selectedNoteID, existingTags, onSelectTags, onClose }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(existingTags);

  useEffect(() => {
    fetchTags();
  }, [selectedNoteID]);

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/tags');
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagToggle = async (tagID, checked) => {
    const updatedTags = checked
      ? [...selectedTags, tagID]
      : selectedTags.filter((id) => id !== tagID);

    setSelectedTags(updatedTags);
    onSelectTags(updatedTags);

    try {
      if (checked) {
        const response = await axios.put(`http://localhost:9000/api/note/${selectedNoteID}/tagsUpdate`, {
          noteId: selectedNoteID,
          tags: [tagID]
        });

        console.log('Tags added successfully:', response.data);
      } else {
        // // If no tags are selected after update, you can delete the tags for the note
        // if (updatedTags.length === 0) {
        //   await axios.delete(`http://localhost:9000/api/note/${selectedNoteID}/tags`);
        // } else {
        //   await axios.delete(`http://localhost:9000/api/note/${selectedNoteID}/tag/${tagID}`);
        console.log('Tag removed successfully');
        }
        
      } catch (error) {
      console.error('Error during updating tags for the note:', error);
    }
  };

  return (
    <div>
      <div className="tag-list-container">
        <ul>
          {tags.map((tag) => (
            <li key={tag.TagID} className="tag-list-item">
              <label>
                <input
                  type="checkbox"
                  className="tag-checkbox"
                  checked={selectedTags.includes(tag.TagName)}
                  onChange={(e) => handleTagToggle(tag.TagID, e.target.checked)}
                />
                {tag.TagName}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button id="closeBtn" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default TagSelectionPopup;