import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components-style/TagSelectionPopup.css';

const TagSelectionPopup = ({ selectedSubjectID, existingTags, onSelectTags, onClose }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags();
  }, [selectedSubjectID]);


const fetchTags = async () => {
  try {
    const response = await axios.get('http://localhost:9000/api/tags'); 
    setTags(response.data); // Set the tags in state
  } catch (error) {
    console.error('Error fetching tags:', error);
  }
};


  console.log(tags);

  const handleTagToggle = (tagID, checked) => {
    onSelectTags((prevTags) => {
      if (checked) {
        return [...prevTags, tagID];
      } else {
        return prevTags.filter((id) => id !== tagID);
      }
    });
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
                checked={existingTags.includes(tag.TagName)}
                onChange={(e) => handleTagToggle(tag.TagName, e.target.checked)}
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
