import Mongoose from "mongoose";
import { Info } from "./info.js";

export const infoMongoStore = {
  async getAllinfos() {
    const infos = await Info.find().lean();
    return infos;
  },

  async addinfo(venueId, info) {
    info.venueid = venueId;
    const newinfo = new Info(info);
    const infoObj = await newinfo.save();
    return this.getinfoById(infoObj._id);
  },

  async getinfosByvenueId(id) {
    const infos = await Info.find({ venueid: id }).lean();
    return infos;
  },

  async getinfoById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const info = await Info.findOne({ _id: id }).lean();
      return info;
    }
    return null;
  },

  async deleteinfo(id) {
    try {
      await info.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllinfos() {
    await info.deleteMany({});
  },

  async updateinfo(info, updatedinfo) {
    const infoDoc = await info.findOne({ _id: info._id });
    infoDoc.title = updatedinfo.title;
    infoDoc.artist = updatedinfo.artist;
    infoDoc.duration = updatedinfo.duration;
    await infoDoc.save();
  },
};
