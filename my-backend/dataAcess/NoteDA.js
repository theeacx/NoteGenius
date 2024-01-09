import Note from '../entities/Note.js';
import Tag from '../entities/Tag.js'; 
import Subject from '../entities/Subject.js';
import User from '../entities/User.js';
import LikeOp from "./Operators.js"

async function getNotes() {
    return await Note.findAll({include: ["Tags", "Subject","User"]});
}

async function getNoteById(id) {
    return await Note.findByPk(id,{include: ["Tags"]});
}
async function deleteNote(id) {
    let note = await Note.findByPk(id);
    return await note.destroy();
}
async function createNote(note) {
    return await Note.create(note);
}
async function updateNote(id, note) {
    try {
      let updateNote = await getNoteById(id);
      if (!updateNote) return { error: true, msg: "No entity found" };
      await updateNote.update(note);
      updateNote = await getNoteById(id);
      return { error: false, msg: "User updated successfully", obj: updateNote };
    } catch (error) {
      return { error: true, msg: "Error updating user" };
    }
  }

//make me a function that when i log in as a user i can see only my notes
async function getNotesByUserId(id) {
  return await Note.findAll({where: {UserID: id}});
}

// function to get the notes from the database with filter and pagination
async function getNotesWithFilterAndPagination(filter) {

  // Set default pagination
  const take = filter.take ? parseInt(filter.take) : 100;
  const skip = filter.skip ? (parseInt(filter.skip) - 1) * take : 0;

  // Main where clause
  let whereClause = {};
  if (filter.Title) whereClause.Title = {[LikeOp]: `%${filter.Title}%`};
  if (filter.UserID) whereClause.UserID = filter.UserID;
  if (filter.SubjectID) whereClause.SubjectID = filter.SubjectID;

  // Include clause for Tags
  let tagWhereClause = {};
  let tagRequired = false;
  if (filter.TagName) {
    tagWhereClause.TagName = {[LikeOp]: `%${filter.TagName}%`};
    tagRequired = true; // Set to true only if filtering by tags
  }

  // Include clause for Subject
  let subjectWhereClause = {};
  let subjectRequired = false;
  if (filter.SubjectName) {
    subjectWhereClause.SubjectName = {[LikeOp]: `%${filter.SubjectName}%`};
    subjectRequired = true; // Set to true only if filtering by subject name
  }
  let userWhereClause = {};
  let userRequired = false;
  if (filter.FirstName) {
    userWhereClause.FirstName = {[LikeOp]: `%${filter.FirstName}%`};
    userRequired = true; // Set to true only if filtering by subject name
  }
  if(filter.LastName){
    userWhereClause.LastName = {[LikeOp]: `%${filter.LastName}%`};
    userRequired = true;
  }
  if(filter.Email){
    userWhereClause.Email = {[LikeOp]: `%${filter.Email}%`};
    userRequired = true;
  }

  return await Note.findAndCountAll({
    distinct: true,
    include: [
      {
        model: Tag,
        as: 'Tags',
        where: tagWhereClause,
        required: tagRequired // Use true if filtering by tags
      },
      {
        model: Subject,
        as: 'Subject',
        where: subjectWhereClause,
        required: subjectRequired // Use true if filtering by subject name
      },
      // Include User if necessary
      {
        model: User,
        as: 'User',
        where: userWhereClause,
        required: userRequired
      }
    ],
    where: whereClause,
    limit: take,
    offset: skip,
  });
}

// async function getNotesWithFilterAndPagination(filter) {
//   // Set default pagination
//   const take = filter.take ? parseInt(filter.take) : 100;
//   const skip = filter.skip ? (parseInt(filter.skip) - 1) * take : 0;

//   // Main where clause
//   let whereClause = {};
//   if (filter.Title) whereClause.Title = {[LikeOp]: `%${filter.Title}%`};
//   if (filter.UserID) whereClause.UserID = filter.UserID;
//   if (filter.SubjectID) whereClause.SubjectID = filter.SubjectID;

//   // Include clause for Tags
//   let tagWhereClause = {};
//   let tagRequired = false;
//   if (filter.TagName) {
//     tagWhereClause.TagName = {[LikeOp]: `%${filter.TagName}%`};
//     tagRequired = true; // Set to true only if filtering by tags
//   }

//   // Include clause for Subject
//   let subjectWhereClause = {};
//   let subjectRequired = false;
//   if (filter.SubjectName) {
//     subjectWhereClause.SubjectName = {[LikeOp]: `%${filter.SubjectName}%`};
//     subjectRequired = true; // Set to true only if filtering by subject name
//   }
//   let userWhereClause = {};
//   let userRequired = false;
//   if (filter.FirstName) {
//     userWhereClause.FirstName = {[LikeOp]: `%${filter.FirstName}%`};
//     userRequired = true; // Set to true only if filtering by subject name
//   }
//   if(filter.LastName){
//     userWhereClause.LastName = {[LikeOp]: `%${filter.LastName}%`};
//     userRequired = true;
//   }
//   if(filter.Email){
//     userWhereClause.Email = {[LikeOp]: `%${filter.Email}%`};
//     userRequired = true;
//   }

//   return await Note.findAndCountAll({
//     distinct: true,
//     include: [
//       {
//         model: Tag,
//         as: 'Tags',
//         where: tagWhereClause,
//         required: tagRequired // Use true if filtering by tags
//       },
//       {
//         model: Subject,
//         as: 'Subject',
//         where: subjectWhereClause,
//         required: subjectRequired // Use true if filtering by subject name
//       },
//       // Include User if necessary
//       {
//         model: User,
//         as: 'User',
//         where: userWhereClause,
//         required: userRequired
//       }
//     ],
//     where: whereClause,
//     limit: take,
//     offset: skip,
//   });
// }


export{
    getNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote,
    getNotesWithFilterAndPagination,
    getNotesByUserId
};