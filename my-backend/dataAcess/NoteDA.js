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

  //http://localhost:9000/api/noteFilter?Title=Promises
// async function getNotesWithFilterAndPagination(filter){
//   //pagination
//   if (!filter.take)
//     filter.take = 10;

//   if (!filter.skip)
//     filter.skip = 1;
//   //filter
//   let whereClause = {};
//   if (filter.Title)
//       whereClause.Title = {[LikeOp]: `%${filter.Title}%`};

//   // if (filter.Tags.TagName)
//   //   whereClause.Tags.TagName = {[LikeOp]: `%${filter.Tags.TagName}%`};
  
//   if (filter.UserID)
//   whereClause.UserID = {[LikeOp]: `%${filter.UserID}%`};

//   if (filter.SubjectID)
//   whereClause.SubjectID = {[LikeOp]: `%${filter.SubjectID}%`};

//   let whereIncludeClause = {};
//   if (filter.TagName)
//   whereIncludeClause.TagName = {[LikeOp]: `%${filter.TagName}%`};
// let whereIncludeClause2 = {};
//   if(filter.SubjectName)
//   whereIncludeClause2.SubjectName = {[LikeOp]: `%${filter.SubjectName}%`};
//   // // if (filter.UserID)
//   // //   whereIncludeClause.UserID = {[LikeOp]: `%${filter.UserID}%`};

//   return await Note.findAndCountAll (
//     {   
//       distinct: true,         
//       include:
//        [
//          {
//           model: Tag,
//           as: "Tags",
//           where: whereIncludeClause,
//           required: false
//          },
//          {
//           model: Subject,
//           as: "Subject",
//           required: true,
//           where: whereIncludeClause2
//          }//,
//         //  {
//         //   model: User,
//         //   as: "User",
//         //   required: false
//         //  }
//        ],
//       //include: ["Tags", "Subject", "User"],
//        where: whereClause,
//        limit: parseInt(filter.take),
//        offset: parseInt(filter.skip - 1) * parseInt(filter.take), // skip este pagina curenta iar take sunt cate inregistrari vin pe pagina
//     });
// }
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


export{
    getNotes,
    getNoteById,
    deleteNote,
    createNote,
    updateNote,
    getNotesWithFilterAndPagination
};