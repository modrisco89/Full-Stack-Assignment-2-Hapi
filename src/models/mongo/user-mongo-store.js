import Mongoose from "mongoose";
import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const user = await User.findOne({ _id: id }).lean();
      return user;
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    if (userObj.firstName==="admin") {
    userObj.admin = true;
    }
    else {
    userObj.admin = false;
    }
    await userObj.save();
    const u = await this.getUserById(userObj._id);
    return u;
  },


  async updateUser(user, updatedUser) {
    const userDoc = await User.findOne({ _id: user._id });
    userDoc.email = updatedUser.email;
    userDoc.firstName = updatedUser.firstName;
    userDoc.lastName = updatedUser.lastName;
    userDoc.password= updatedUser.password;
    await userDoc.save();
  },

  async updatePassword(user, password) {
    const userDoc = await User.findOne({ _id: user._id });
    userDoc.password = password.password;
    await userDoc.save();
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAll() {
    await User.deleteMany({});
  },
};
