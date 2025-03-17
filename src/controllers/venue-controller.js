import dayjs from "dayjs";
import { createRequire } from "module";
import { infoSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

const require = createRequire(import.meta.url);

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
      const loggedInUser = request.auth.credentials;
      const venue = await db.venueStore.getvenueById(request.params.id);
      let eventDate = new Date();
      
      const utc = require("dayjs/plugin/utc");
      const timezone = require("dayjs/plugin/timezone");
      const customParseFormat = require("dayjs/plugin/customParseFormat");
      dayjs.extend(utc);
      dayjs.extend(timezone);
      dayjs.extend(customParseFormat);
      const dateTime = dayjs();

      eventDate = request.payload.duration;
      const eventDateCut = eventDate.toISOString().slice(0, 10);
      const newinfo = {
        userid: loggedInUser._id,
        title: request.payload.title,
        artist: request.payload.artist,
        duration: eventDateCut,
        genre: request.payload.genre
      };
      const admin ={
        firstName: loggedInUser.firstName,
        email: loggedInUser.email,
        lastName: loggedInUser.lastName,
        action: "Event Added",
        date:  dateTime.tz("Europe/London").format("DD-MM-YYYY HH:mm:ss"),
      }
      await db.infoStore.addinfo(venue._id, newinfo);
      await db.adminStore.addadmin(admin);
      return h.redirect(`/venue/${venue._id}`);
    },
  },

  deleteinfo: {
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
        action: "Event Deleted",
        date:  dateTime.tz("Europe/London").format("DD-MM-YYYY HH:mm:ss"),
      }
      await db.adminStore.addadmin(admin);
      await db.infoStore.deleteinfo(request.params.infoid);
      return h.redirect(`/venue/${venue._id}`);
    },
  },
};
