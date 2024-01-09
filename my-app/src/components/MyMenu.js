import React from 'react';
import '../components-style/MyMenu.css';

function MyMenu() {
  return (
    <div className="menu-container">
      <h3 className="menu-title">Menu</h3>
      <input type="text" placeholder="Search.." name="search" className="menu-search" />
      <ul className="menu-options">
        <li className="menu-option">Home</li>
        <select className="form-select" aria-label="Default select example" defaultValue="Subjects">
          <option value="Subjects">Subjects</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <select className="form-select" aria-label="Default select example" defaultValue="Tags">
          <option value="Tags">Tags</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <select className="form-select" aria-label="Default select example" defaultValue="Groups">
          <option value="Groups">Groups</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </ul>
    </div>
  );
}

export default MyMenu;
