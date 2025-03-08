import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const infoJsonStore = {
  async getAllinfos() {
    await db.read();
    return db.data.infos;
  },

  async addinfo(venueId, info) {
    await db.read();
    info._id = v4();
    info.venueid = venueId;
    db.data.infos.push(info);
    await db.write();
    return info;
  },

  async getinfosByvenueId(id) {
    await db.read();
    let t = db.data.infos.filter((info) => info.venueid === id);
    if (t === undefined) t = null;
    return t;
  },

  async getinfoById(id) {
    await db.read();
    let t = db.data.infos.find((info) => info._id === id);
    if (t === undefined) t = null;
    return t;
  },

  async deleteinfo(id) {
    await db.read();
    const index = db.data.infos.findIndex((info) => info._id === id);
    if (index !== -1) db.data.infos.splice(index, 1);
    await db.write();
  },

  async deleteAllinfos() {
    db.data.infos = [];
    await db.write();
  },

  async updateinfo(info, updatedinfo) {
    info.title = updatedinfo.title;
    info.artist = updatedinfo.artist;
    info.duration = updatedinfo.duration;
    await db.write();
  },
};
