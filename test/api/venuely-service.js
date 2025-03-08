import axios from "axios";
import { serviceUrl } from "../fixtures.js";

export const venuelyService = {
  venuelyUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.venuelyUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.venuelyUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.venuelyUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.venuelyUrl}/api/users`);
    return res.data;
  },

  async createvenue(venue) {
    const res = await axios.post(`${this.venuelyUrl}/api/venues`, venue);
    return res.data;
  },

  async deleteAllvenues() {
    const response = await axios.delete(`${this.venuelyUrl}/api/venues`);
    return response.data;
  },

  async deletevenue(id) {
    const response = await axios.delete(`${this.venuelyUrl}/api/venues/${id}`);
    return response;
  },

  async getAllvenues() {
    const res = await axios.get(`${this.venuelyUrl}/api/venues`);
    return res.data;
  },

  async getvenue(id) {
    const res = await axios.get(`${this.venuelyUrl}/api/venues/${id}`);
    return res.data;
  },

  async getAllinfos() {
    const res = await axios.get(`${this.venuelyUrl}/api/infos`);
    return res.data;
  },

  async createinfo(id, info) {
    const res = await axios.post(`${this.venuelyUrl}/api/venues/${id}/infos`, info);
    return res.data;
  },

  async deleteAllinfos() {
    const res = await axios.delete(`${this.venuelyUrl}/api/infos`);
    return res.data;
  },

  async getinfo(id) {
    const res = await axios.get(`${this.venuelyUrl}/api/infos/${id}`);
    return res.data;
  },

  async deleteinfo(id) {
    const res = await axios.delete(`${this.venuelyUrl}/api/infos/${id}`);
    return res.data;
  },
};
