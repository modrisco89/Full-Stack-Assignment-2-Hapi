import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const adminApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const admins = await db.adminStore.getAlladmins();
        return admins;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const admin = await db.adminStore.getadminById(request.params.id);
        if (!admin) {
          return Boom.notFound("No admin with this id");
        }
        return admin;
      } catch (err) {
        return Boom.serverUnavailable("No admin with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const admin = await db.adminStore.addadmin(request.params.id, request.payload);
        if (admin) {
          return h.response(admin).code(201);
        }
        return Boom.badImplementation("error creating admin");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.adminStore.deleteAlladmins();
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
        const admin = await db.adminStore.getadminById(request.params.id);
        if (!admin) {
          return Boom.notFound("No admin with this id");
        }
        await db.adminStore.deleteadmin(admin._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No admin with this id");
      }
    },
  },
};
