import dayjs from "dayjs";
import { createRequire } from "module";
import { venueSpec } from "../models/joi-schemas.js";
import { imageStore } from "../models/image-store.js";
import { db } from "../models/db.js";

const require = createRequire(import.meta.url);

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const adminInfo = await db.adminStore.getAlladmins();
      const venues = await db.venueStore.getUservenues(loggedInUser._id);
      const viewData = {
        title: "Venuely Dashboard",
        user: loggedInUser,
        adminInfo: adminInfo,
        venues: venues,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addvenue: {

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const file = request.payload.imagefile;
      const utc = require("dayjs/plugin/utc");
      const timezone = require("dayjs/plugin/timezone");
      const customParseFormat = require("dayjs/plugin/customParseFormat");
      dayjs.extend(utc);
      dayjs.extend(timezone);
      dayjs.extend(customParseFormat);
      const dateTime = dayjs();

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
      const admin ={
        firstName: loggedInUser.firstName,
        email: loggedInUser.email,
        lastName: loggedInUser.lastName,
        action: "Venue Added",
        date:  dateTime.tz("Europe/London").format("DD-MM-YYYY HH:mm:ss"),
      }
      await db.adminStore.addadmin(admin);
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
      const loggedInUser = request.auth.credentials;
      const utc = require("dayjs/plugin/utc");
      const timezone = require("dayjs/plugin/timezone");
      const customParseFormat = require("dayjs/plugin/customParseFormat");
      dayjs.extend(utc);
      dayjs.extend(timezone);
      dayjs.extend(customParseFormat);
      const dateTime = dayjs();
      const admin ={
        firstName: loggedInUser.firstName,
        email: loggedInUser.email,
        lastName: loggedInUser.lastName,
        action: "Venue Deleted",
        date:  dateTime.tz("Europe/London").format("DD-MM-YYYY HH:mm:ss"),
      }
      await db.adminStore.addadmin(admin);
      await db.venueStore.deletevenueById(venue._id);
      await imageStore.deleteImage(venue.imgId);
      return h.redirect("/dashboard");
    },
  },
};
