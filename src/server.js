import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import HapiCors from "hapi-cors";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
  });
 await server.register({
    plugin: HapiCors,
    options: {
      origins: ["http://localhost:5173"],  // Specify the allowed origin (your Svelte frontend)
      allowCredentials: "true",  // Allows credentials (cookies) to be sent
      exposeHeaders: ["Authorization"],
      methods: ["GET", "POST", "DELETE", "PUT"],
      headers: ["Authorization", "Content-Type"]
    },
  });
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);
  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");
  server.auth.strategy("jwt", "jwt", {
    key: process.env.cookie_password,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] }
  });
  

  db.init("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});



init();
