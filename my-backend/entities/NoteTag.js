// Import necessary modules and dependencies
import db from '../dbConfig.js';
import Sequelize from 'sequelize';

// Define the "NoteTags" model
const NoteTag = db.define('NoteTag', {
  NoteID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  TagID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
}, {
  tableName: 'notetags',
  timestamps: false,
  freezeTableName: true
});


// Export the NoteTag model
export default NoteTag;
