// Import necessary modules and dependencies
import db from '../dbConfig.js';
import Sequelize from 'sequelize';
import Note from './Notes.mjs'; // Assuming you have a Note model
import User from './Users.mjs'; // Assuming you have a User model

// Define the "NoteSharing" model
const NoteSharing = db.define('NoteSharing', {
  NoteID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Note, // Reference to the Note model
      key: 'NoteID', // The primary key of the Note model
    },
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference to the User model
      key: 'UserID', // The primary key of the User model
    },
  },
  SharedUserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference to the User model
      key: 'UserID', // The primary key of the User model
    },
  },
}, {
  primaryKey: true, // Define the composite primary key
});

// Export the NoteSharing model
export default NoteSharing;
