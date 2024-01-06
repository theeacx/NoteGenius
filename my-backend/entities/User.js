import db from '../dbConfig.js';
import Sequelize from 'sequelize';

const User = db.define('User', {
  UserID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  FirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

export default User;
