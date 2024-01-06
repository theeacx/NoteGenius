// Import necessary modules and dependencies
import db from '../dbConfig.js';
import Sequelize from 'sequelize';

// Define the "Tags" model
const Tag = db.define('Tag', {
  TagID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  TagName: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
});


export default Tag;
