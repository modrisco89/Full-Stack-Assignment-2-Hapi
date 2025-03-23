import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const adminJsonStore = {
  async getAlladmins() {
    await db.read();
    return db.data.admins;
  },

  async addadmin(admin) {
    await db.read();
    admin._id = v4();
    db.data.admins.push(admin);
    await db.write();
    return admin;
  },

  async getadminById(id) {
    await db.read();
    let u = db.data.admins.find((admin) => admin._id === id);
    if (u === undefined) u = null;
    return u;
  },

  async getadminByEmail(email) {
    await db.read();
    let u = db.data.admins.find((admin) => admin.email === email);
    if (u === undefined) u = null;
    return u;
  },

  async deleteadminById(id) {
    await db.read();
    const index = db.data.admins.findIndex((admin) => admin._id === id);
    if (index !== -1) db.data.admins.splice(index, 1);
    await db.write();
  },

  async deleteAll() {
    db.data.admins = [];
    await db.write();
  },
};
