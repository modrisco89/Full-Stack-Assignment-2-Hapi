import { v4 } from "uuid";
import { infoMemStore } from "./info-mem-store.js";

let venues = [];

export const venueMemStore = {
  async getAllvenues() {
    return venues;
  },

  async addvenue(venue) {
    venue._id = v4();
    venues.push(venue);
    return venue;
  },

  async getvenueById(id) {
    const list = venues.find((venue) => venue._id === id);
    if (list) {
      list.infos = await infoMemStore.getinfosByvenueId(list._id);
      return list;
    }
    return null;
  },

  async getUservenues(userid) {
    return venues.filter((venue) => venue.userid === userid);
  },

  async deletevenueById(id) {
    const index = venues.findIndex((venue) => venue._id === id);
    if (index !== -1) venues.splice(index, 1);
  },

  async deleteAllvenues() {
    venues = [];
  },
};
