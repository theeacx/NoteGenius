// Import necessary modules and dependencies
import Subject from '../entities/Subject.js';

// Function to get all subjects
async function getSubjects() {
    return await Subject.findAll();
}

// Function to get a subject by ID
async function getSubjectById(id) {
    return await Subject.findByPk(id);
}

// Function to create a new subject
async function createSubject (subject) {
    try {
      let createdSubject = await Subject.create(subject);
      return { error: false, msg: "Subject created successfully", obj: createdSubject };
    } catch (error) {
      // Handle and log the error
      console.error('Error during subject creation:', error);
      return { error: true, msg: "Error creating subject" };
    }
  }

// Function to delete a subject by ID
async function deleteSubject(id) {
    let subject = await Subject.findByPk(id);
    return await subject.destroy();
}
async function getSubjectsByUser(userId) {
  if (userId) {
    return await Subject.findAll({ where: { UserID: userId } }); // Use "UserID" to filter by user ID
  } else {
    return await Subject.findAll();
  }
}
// Export the functions
export {
  getSubjects,
  getSubjectById,
  createSubject,
  deleteSubject,
  getSubjectsByUser
}
