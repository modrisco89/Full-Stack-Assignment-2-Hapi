import { venueSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
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

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      const url = await imageStore.uploadImage(request.payload.imagefile);
      const reversedUrl = url.split("/").reverse().join("/");
      const publicIdWithExtension = reversedUrl.split("/")[0];
      const publicId = publicIdWithExtension.split(".")[0];
      

      const newvenue = {
        userid: loggedInUser._id,
        title: request.payload.title,
        description: request.payload.description,
        latitude: Number(request.payload.latitude),
        longitude: Number(request.payload.longitude),
        capacity: request.payload.capacity,
        img: url,
        imgId: publicId,
      }
      await db.venueStore.addvenue(newvenue);
      return h.redirect("/dashboard");
    },

    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },

    validate: {
      payload:
        venueSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add venue error", errors: error.details }).takeover().code(400);
      },
    },
  },

  deletevenue: {
    handler: async function (request, h) {
      const venue = await db.venueStore.getvenueById(request.params.id);
      await db.venueStore.deletevenueById(venue._id);
      await imageStore.deleteImage(venue.imgId);
      return h.redirect("/dashboard");
    },
  },
};
