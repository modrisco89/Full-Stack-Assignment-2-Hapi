import { userMemStore } from "./mem/user-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";
import { adminMemStore } from "./mem/admin-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { adminJsonStore } from "./json/admin-json-store.js";
import { venueJsonStore } from "./json/venue-json-store.js";
import { infoJsonStore } from "./json/info-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { venueMongoStore } from "./mongo/venue-mongo-store.js";
import { infoMongoStore } from "./mongo/info-mongo-store.js";
import { adminMongoStore } from "./mongo/admin-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  venueStore: null,
  infoStore: null,

  init(storeType) {
    switch (storeType) {
      case "mem" :
        this.userStore = userMemStore;
        this.venueStore = venueMemStore;
        this.infoStore = infoMemStore;
        this.adminStore = adminMemStore;
        break;
      case "json" :
        this.userStore = userJsonStore;
        this.venueStore = venueJsonStore;
        this.infoStore = infoJsonStore;
        this.adminStore = adminJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.venueStore = venueMongoStore;
        this.infoStore = infoMongoStore;
        this.adminStore = adminMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.venueStore = venueMemStore;
        this.infoStore = infoMemStore;
      
    }
  }
};
