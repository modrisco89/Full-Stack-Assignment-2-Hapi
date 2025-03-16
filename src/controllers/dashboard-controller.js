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
      const file = request.payload.imagefile;

      let url = "";
      let publicId = "";

      if (Object.keys(file).length > 0) {
            
      
      url = await imageStore.uploadImage(file);
      const reversedUrl = url.split("/").reverse().join("/");
      const publicIdWithExtension = reversedUrl.split("/")[0];
      // eslint-disable-next-line prefer-destructuring
      publicId = publicIdWithExtension.split(".")[0];
    
    }else {
      url = "https://res.cloudinary.com/dh7gl6628/image/upload/v1742147015/placeholder_tiaq4k.jpg";
      publicId = "placeholder_tiaq4k"; 
    }
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
