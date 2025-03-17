import { userMemStore } from "./mem/user-mem-store.js";
import { venueMemStore } from "./mem/venue-mem-store.js";
import { infoMemStore } from "./mem/info-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
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
      case "json" :
        this.userStore = userJsonStore;
        this.venueStore = venueJsonStore;
        this.infoStore = infoJsonStore;
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
