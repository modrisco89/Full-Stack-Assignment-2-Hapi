import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const infoApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const infos = await db.infoStore.getAllinfos();
        return infos;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const info = await db.infoStore.getinfoById(request.params.id);
        if (!info) {
          return Boom.notFound("No info with this id");
        }
        return info;
      } catch (err) {
        return Boom.serverUnavailable("No info with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const info = await db.infoStore.addinfo(request.params.id, request.payload);
        if (info) {
          return h.response(info).code(201);
        }
        return Boom.badImplementation("error creating info");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.infoStore.deleteAllinfos();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const info = await db.infoStore.getinfoById(request.params.id);
        if (!info) {
          return Boom.notFound("No info with this id");
        }
        await db.infoStore.deleteinfo(info._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No info with this id");
      }
    },
  },
};
