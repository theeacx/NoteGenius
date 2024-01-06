import User from "../entities/User.js";
import Subject from "../entities/Subject.js";
import Note from "../entities/Note.js";
import LikeOp from "./Operators.js";
async function getUsers() {
    return await User.findAll({include: ["Subjects", "Notes"]});
}

// Function to get a user by ID
async function getUserById(id) {
    return await User.findByPk(id,{include: ["Subjects", "Notes"]});
}

// Function to create a new user
async function createUser(user) {
    return await User.create(user);
}

// Function to delete a user
async function deleteUser(id) {
    let user = await User.findByPk(id);
    return await user.destroy();
}


async function updateUser(id, user) {
    try {
      let updateUser = await getUserById(id);
      if (!updateUser) return { error: true, msg: "No entity found" };
      await updateUser.update(user);
      updateUser = await getUserById(id);
      return { error: false, msg: "User updated successfully", obj: updateUser };
    } catch (error) {
      return { error: true, msg: "Error updating user" };
    }
  }


export {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser
};

