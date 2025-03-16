import { infoSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const infoController = {
  index: {
    handler: async function (request, h) {
      const venue = await db.venueStore.getvenueById(request.params.id);
      const info = await db.infoStore.getinfoById(request.params.infoid);
      const viewData = {
        title: "Edit Concert",
        venue: venue,
        info: info,
      };
      return h.view("info-view", viewData);
    },
  },

  update: {
    validate: {
      payload: infoSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("info-view", { title: "Edit info error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const info = await db.infoStore.getinfoById(request.params.infoid);
      let eventDate = new Date();
      eventDate = request.payload.duration
      const eventDateCut = eventDate.toISOString().slice(0, 10);
      const newinfo = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: eventDateCut,
        genre: request.payload.genre
      };
      await db.infoStore.updateinfo(info, newinfo);
      return h.redirect(`/venue/${request.params.id}`);
    },
  },
};
