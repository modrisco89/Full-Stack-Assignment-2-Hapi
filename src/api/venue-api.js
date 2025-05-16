import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const venueApi = {
  
  find: {
    
    auth: {
       strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        console.log("did I get here? 2");
        const venues = await db.venueStore.getAllvenues();
        return venues;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },


  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const venue = await db.venueStore.getvenueById(request.params.id);
        if (!venue) {
          return Boom.notFound("No venue with this id");
        }
        return venue;
      } catch (err) {
        return Boom.serverUnavailable("No venue with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const venue = request.payload;
        const newvenue = await db.venueStore.addvenue(venue);
        if (newvenue) {
          return h.response(newvenue).code(201);
        }
        return Boom.badImplementation("error creating venue");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const venue = await db.venueStore.getvenueById(request.params.id);
        if (!venue) {
          return Boom.notFound("No venue with this id");
        }
        await db.venueStore.deletevenueById(venue._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No venue with this id");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.venueStore.deleteAllvenues();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
