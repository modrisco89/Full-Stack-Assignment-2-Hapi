import Mongoose from "mongoose";
import { Venue } from "./venue.js";
import { infoMongoStore } from "./info-mongo-store.js";
import { Info } from "./info.js";


export const venueMongoStore = {
  async getAllvenues() {
    const venues = await Venue.find().lean();
    console.log(venues);
    return venues;
  },

  async getvenueById(id) {
    if (Mongoose.isValidObjectId(id)) {
      const venue = await Venue.findOne({ _id: id }).lean();
      if (venue) {
        venue.infos = await infoMongoStore.getinfosByvenueId(venue._id);
      }
      return venue;
    }
    return null;
  },

  async addvenue(venue) {
    const newvenue = new Venue(venue);
    const venueObj = await newvenue.save();
    return this.getvenueById(venueObj._id);
  },

  async getUservenues(id) {
    const venue = await Venue.find({ userid: id }).lean();
    return venue;
  },

  async deletevenueById(id) {
    try {
      await Venue.deleteOne({ _id: id });
      await Info.deleteMany({venueid: id});
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllVenuesByUserId(id) {
    try {
      await Venue.deleteMany({ userid: id });
      await Info.deleteMany({userid: id});
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllvenues() {
    await Venue.deleteMany({});
  },
};
