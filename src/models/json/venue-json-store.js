import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { infoJsonStore } from "./info-json-store.js";

export const venueJsonStore = {
  async getAllvenues() {
    await db.read();
    return db.data.venues;
  },

  async addvenue(venue) {
    await db.read();
    venue._id = v4();
    db.data.venues.push(venue);
    await db.write();
    return venue;
  },

  async getvenueById(id) {
    await db.read();
    let list = db.data.venues.find((venue) => venue._id === id);
    if (list) {
      list.infos = await infoJsonStore.getinfosByvenueId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUservenues(userid) {
    await db.read();
    return db.data.venues.filter((venue) => venue.userid === userid);
  },

  async deletevenueById(id) {
    await db.read();
    const index = db.data.venues.findIndex((venue) => venue._id === id);
    if (index !== -1) db.data.venues.splice(index, 1);
    await db.write();
  },

  async deleteAllvenues() {
    db.data.venues = [];
    await db.write();
  },
};
