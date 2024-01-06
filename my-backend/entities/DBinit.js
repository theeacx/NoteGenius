import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import User from './User.js';
import Tag from './Tag.js';
import Subject from './Subject.js';
import Note from './Note.js';

env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}
 function FK_Config(){
    // user and classes 1-n
    User.hasMany(Subject, {as: 'Subjects', foreignKey: 'UserID'});
    Subject.belongsTo(User, {as: 'User', foreignKey: 'UserID'});

    // user and notes 1-n
    User.hasMany(Note, {as: 'Notes', foreignKey: 'UserID'});
    Note.belongsTo(User, {as: 'User', foreignKey: 'UserID'});

    //classes and notes 1-n
    Subject.hasMany(Note, {as: 'Notes', foreignKey: 'SubjectID'});
    Note.belongsTo(Subject, {as: 'Subject', foreignKey: 'SubjectID'});

    //notes and tags n-n
    Note.belongsToMany(Tag, {as: 'Tags', through: 'NoteTags', foreignKey: 'NoteID'});
    Tag.belongsToMany(Note, {as: 'Notes', through: 'NoteTags', foreignKey: 'TagID'});
 }

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;
