import { infoSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const venueController = {
  index: {
    handler: async function (request, h) {
      const venue = await db.venueStore.getvenueById(request.params.id);
      const viewData = {
        title: "venue",
        venue: venue,
      };
      return h.view("venue-view", viewData);
    },
  },

  addinfo: {
    validate: {
      payload: infoSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("venue-view", { title: "Add info error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const venue = await db.venueStore.getvenueById(request.params.id);
      const newinfo = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: Number(request.payload.duration),
      };
      await db.infoStore.addinfo(venue._id, newinfo);
      return h.redirect(`/venue/${venue._id}`);
    },
  },

  deleteinfo: {
    handler: async function (request, h) {
      const venue = await db.venueStore.getvenueById(request.params.id);
      await db.infoStore.deleteinfo(request.params.infoid);
      return h.redirect(`/venue/${venue._id}`);
    },
  },
};
