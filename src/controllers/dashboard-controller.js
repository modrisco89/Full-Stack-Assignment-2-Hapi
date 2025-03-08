import { venueSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const venues = await db.venueStore.getUservenues(loggedInUser._id);
      const viewData = {
        title: "Venuely Dashboard",
        user: loggedInUser,
        venues: venues,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addvenue: {
    validate: {
      payload: venueSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add venue error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newvenue = {
        userid: loggedInUser._id,
        title: request.payload.title,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude)
        
      };
      await db.venueStore.addvenue(newvenue);
      return h.redirect("/dashboard");
    },
  },

  deletevenue: {
    handler: async function (request, h) {
      const venue = await db.venueStore.getvenueById(request.params.id);
      await db.venueStore.deletevenueById(venue._id);
      return h.redirect("/dashboard");
    },
  },
};
