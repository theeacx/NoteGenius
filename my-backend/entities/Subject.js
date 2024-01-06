// Import necessary modules and dependencies
import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const Subject = db.define('Subject', {
  SubjectID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  SubjectName: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Export the Class model
export default Subject;
