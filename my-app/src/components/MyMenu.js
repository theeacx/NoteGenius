import React from 'react';
import '../components-style/MyMenu.css'

function MyMenu() {
    return (
        <div className="menu-container">
        <h3 className="menu-title">Menu</h3>
        <input type="text" placeholder="Search.." name="search" className="menu-search" />
        <ul className="menu-options">
          <li className="menu-option">Option 1</li>
          <li className="menu-option">Option 2</li>
          <li className="menu-option">Option 3</li>
        </ul>
      </div>
    );
}

export default MyMenu;
