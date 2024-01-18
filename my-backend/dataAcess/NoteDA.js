import Note from '../entities/Note.js';
import Tag from '../entities/Tag.js'; 
import Subject from '../entities/Subject.js';
import User from '../entities/User.js';
import LikeOp from "./Operators.js"
import NoteTag from '../entities/NoteTag.js';
import axios from 'axios';

async function getNotes() {
    return await Note.findAll({include: ["Tags", "Subject","User"]});
}

async function getNoteById(id) {
    return await Note.findByPk(id,{include: ["Tags"]});
}

// async function deleteNote(id) {
//   let note = await Note.findByPk(id);
//   return await note.destroy();
// }

async function deleteNote(noteId) {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      console.error('Note not found with id:', noteId);
    } else {
      await note.destroy();
    }
  } catch (error) { 
    console.error('Error during deleting the note:', error);
    throw error;
  }
}
async function createNote (note) {
  try {
    // Check if the SubjectID exists in the subject table
    const subjectExists = await Subject.findByPk(note.SubjectID);
    if (!subjectExists) {
      return { error: true, msg: "Invalid SubjectID" };
    }

    let createdNote = await Note.create(note);
    return { error: false, msg: "Note created successfully", obj: createdNote };
  } catch (error) {
    // Handle and log the error
    console.error('Error during note creation:', error);
    return { error: true, msg: "Error creating note" };
  }
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

async function getTagsByNoteId(noteId) {
  try {
    const noteWithTags = await Note.findByPk(noteId, {
      include: [{
        model: Tag,
        as: 'Tags', // Make sure 'Tags' is the correct alias for the association
        through: { attributes: [] } // Exclude the join table attributes
      }]
    });

    if (!noteWithTags) {
      console.error('No note found with id:', noteId);
      return [];
    }

    // Assuming 'Tags' is an array of Tag instances
    return noteWithTags.Tags.map(tag => tag.get({ plain: true })); 
  } catch (error) {
    console.error('Error during retrieving tags for the note:', error);
    throw error;
  }
}
async function prepareTagsAndUpdate(noteId, tagNames) {
  try {
    // Fetch the full list of tags to get their IDs
    const allTagsResponse = await axios.get('http://localhost:9000/api/tags');
    const allTags = allTagsResponse.data;

    // Map tag names to tag IDs
    const tagsWithIDs = tagNames.map(tagName => {
      const tag = allTags.find(t => t.TagName === tagName);
      if (!tag) {
        throw new Error(`Tag not found for name: ${tagName}`);
      }
      return { TagID: tag.TagID };
    });

    // Call updateTagsByNoteId with the mapped tags
    return await updateTagsByNoteId(noteId, tagsWithIDs);
  } catch (error) {
    console.error('Error preparing tags:', error);
    throw error;
  }
}



//update the tags for a note
async function updateTagsByNoteId(noteId, tags) {
  console.log('Updating tags for noteId:', noteId, 'Tags:', tags);

  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      console.error('No note found with id:', noteId);
      return { error: true, msg: "Invalid note id" };
    }

    // Assuming that NoteTag model has a unique constraint on the combination of NoteID and TagID
    const tagPromises = tags.map(tag => NoteTag.findOrCreate({
      where: { NoteID: noteId, TagID: tag.TagID }
    }));

    // Wait for all the findOrCreate operations to complete
    await Promise.all(tagPromises);

    return { error: false, msg: "Tags updated successfully" };
  } catch (error) {
    console.error('Error during updating tags for the note:', error);
    return { error: true, msg: error.message || 'Error during updating tags for the note' };
  }
}


async function deleteTagFromNoteByNoteId(noteId, tagId) {
  try {
    const note = await Note.findByPk(noteId);
    if (!note) {
      console.error('No note found with id:', noteId);
      return { error: true, msg: "Invalid note id" };
    }

    // Delete all existing tags for the note
    await NoteTag.destroy({ where: { NoteID: noteId, TagID: tagId } });

    return { error: false, msg: "Tag deleted successfully" };
  } catch (error) {
    console.error('Error during deleting tags for the note:', error);
    throw error;
  }
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
    getNotesByUserId,
    getTagsByNoteId,
    updateTagsByNoteId,
    deleteTagFromNoteByNoteId,
    prepareTagsAndUpdate
};