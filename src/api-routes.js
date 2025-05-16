import { userApi } from "./api/user-api.js";
import { venueApi } from "./api/venue-api.js";
import { infoApi } from "./api/info-api.js";
import { adminApi } from "./api/admin-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },


  { method: "POST", path: "/api/venues", config: venueApi.create },
  { method: "DELETE", path: "/api/venues", config: venueApi.deleteAll },
  { method: "GET", path: "/api/venues", config: venueApi.find },
  { method: "GET", path: "/api/venues/{id}", config: venueApi.findOne },
  { method: "DELETE", path: "/api/venues/{id}", config: venueApi.deleteOne },

  { method: "GET", path: "/api/infos", config: infoApi.find },
  { method: "GET", path: "/api/infos/{id}", config: infoApi.findOne },
  { method: "POST", path: "/api/venues/{id}/infos", config: infoApi.create },
  { method: "DELETE", path: "/api/infos", config: infoApi.deleteAll },
  { method: "DELETE", path: "/api/infos/{id}", config: infoApi.deleteOne },

  { method: "GET", path: "/api/admins", config: adminApi.find },
  { method: "POST", path: "/api/admins", config: adminApi.create },
  { method: "DELETE", path: "/api/admins", config: adminApi.deleteAll },
  { method: "GET", path: "/api/admins/{id}", config: adminApi.findOne },
];
