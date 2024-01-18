import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components-style/TagSelectionPopup.css';

const TagSelectionPopup = ({ selectedSubjectID, existingTags, onSelectTags, onClose }) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, [selectedSubjectID]);

  useEffect(() => {
    // When the tags are fetched, map the existingTags (tag names) to their TagID
    if (tags.length > 0) {
      const tagIds = existingTags.map(tagName => {
        const tag = tags.find(t => t.TagName === tagName);
        return tag ? tag.TagID : null;
      }).filter(tagId => tagId !== null);

      setSelectedTags(tagIds); // Set the selected tags to the ids
    }
  }, [existingTags, tags]);

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/tags');
      setTags(response.data); // Set the tags in state
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleTagToggle = (tagID, checked) => {
    const updatedTags = checked
      ? [...selectedTags, tagID]
      : selectedTags.filter(id => id !== tagID);
  
    setSelectedTags(updatedTags);
    onSelectTags(updatedTags); // Pass TagID array, not names
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
                  checked={selectedTags.includes(tag.TagID)}
                  onChange={(e) => handleTagToggle(tag.TagID, e.target.checked)}
                />
                {tag.TagName}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button id="closeBtn" onClick={onClose}>Close</button>
    </div>
  );
};

export default TagSelectionPopup;
