import { v4 } from "uuid";

let admins = [];

export const adminMemStore = {
  async getAlladmins() {
    return admins;
  },

  async addadmin(admin) {
    admin._id = v4();
    admins.push(admin);
    return admin;
  },

  async getadminById(id) {
    let foundadmin = admins.find((admin) => admin._id === id);
    if (!foundadmin) {
      foundadmin = null;
    }
    return foundadmin;
  },

  async getadminByEmail(email) {
    let foundadmin = admins.find((admin) => admin.email === email);
    if (!foundadmin) {
      foundadmin = null;
    }
    return foundadmin;
  },

  async deleteadminById(id) {
    const index = admins.findIndex((admin) => admin._id === id);
    if (index !== -1) admins.splice(index, 1);
  },

  async deleteAll() {
    admins = [];
  },
};
