import Mongoose from "mongoose";
import { Admin } from "./admin.js";

export const adminMongoStore = {
  async getAlladmins() {
    const admins = await Admin.find().lean();
    return admins;
  },


  async getAdminById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const admin = await Admin.findOne({ _id: id }).lean();
      return admin;
    }
    return null;
  },


    async getAdminByEmail(email) {
      const admin = await Admin.findOne({ email: email }).lean();
      return admin;
    },

  async addadmin(admin) {
    const newadmin = new Admin(admin);
    const adminObj = await newadmin.save();
    return this.getadminById(adminObj._id);
  },
  
  async getadminById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const admin = await Admin.findOne({ _id: id }).lean();
      return admin;
    }
    return null;
  },

  async deleteadmin(id) {
    try {
      await Admin.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAlladmins() {
    await Admin.deleteMany({});
  },
};
