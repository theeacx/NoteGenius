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
async function createSubject(subject) {
    return await Subject.create(subject);
}

// Function to delete a subject by ID
async function deleteSubject(id) {
    let subject = await Subject.findByPk(id);
    return await subject.destroy();
}

// Export the functions
export {
  getSubjects,
  getSubjectById,
  createSubject,
  deleteSubject
};
