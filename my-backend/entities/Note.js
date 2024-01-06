// Import necessary modules and dependencies
import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Note = db.define('Note', {
  NoteID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Title: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  Content: {
    type: Sequelize.TEXT,
  },
  SubjectID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Export the Note model
export default Note;
