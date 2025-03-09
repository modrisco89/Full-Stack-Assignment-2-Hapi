import { v4 } from "uuid";

let infos = [];

export const infoMemStore = {
  async getAllinfos() {
    return infos;
  },

  async addinfo(venueId, info) {
    info._id = v4();
    info.venueid = venueId;
    infos.push(info);
    return info;
  },

  async getinfosByvenueId(id) {
    return infos.filter((info) => info.venueid === id);
  },

  async getinfoById(id) {
    let foundinfo = infos.find((info) => info._id === id);
    if (!foundinfo) {
      foundinfo = null;
    }
    return foundinfo;
  },

  async getvenueinfos(venueId) {
    let foundinfos = infos.filter((info) => info.venueid === venueId);
    if (!foundinfos) {
      foundinfos = null;
    }
    return foundinfos;
  },

  async deleteinfo(id) {
    const index = infos.findIndex((info) => info._id === id);
    if (index !== -1) infos.splice(index, 1);
  },

  async deleteAllinfos() {
    infos = [];
  },

  async updateinfo(info, updatedinfo) {
    info.title = updatedinfo.title;
    info.artist = updatedinfo.artist;
    info.duration = updatedinfo.duration;
    info.genre = updatedinfo.genre;
  },
};
