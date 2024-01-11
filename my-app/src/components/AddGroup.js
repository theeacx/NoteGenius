import React, { useState } from 'react';
import '../components-style/AddGroup.css';

function AddGroup() {
  const [isFormVisible, setFormVisible] = useState(false);
  const [groupName, setGroupName] = useState('');

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleInputChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleSaveGroup = () => {
    // Add your logic to save the group data
    console.log('Group Name:', groupName);

    // Clear the form and hide it after saving
    setGroupName('');
    setFormVisible(false);
  };

  return (
    <div id="add-group-container" className={`add-group-container ${isFormVisible ? 'open' : ''}`}>
      <button onClick={toggleFormVisibility}>Add Group</button>
      {isFormVisible && (
        <div className="group-form">
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={handleInputChange}
            placeholder="Enter group name"
          />

          <div className="user-dropdown">
          <select className="form-select" aria-label="Default select example" defaultValue="Users">
          <option value="Users">User</option>
          <option value="1">User1</option>
          <option value="2">User2</option>
          <option value="3">User3</option>
          <option value="4">User4</option>
        </select>
          </div>

          <button onClick={handleSaveGroup}>Save Group</button>
        </div>
      )}
    </div>
  );
}

export default AddGroup;