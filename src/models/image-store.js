import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
};
cloudinary.config(credentials);

export const imageStore = {

  getAllImages: async function() {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function(imagefile) {
    writeFileSync("C:/Users/Public/temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("C:/Users/Public/temp.img");
    return response.url;
  },

  uploadImage2: async function (imagefile) {
  const response = await cloudinary.v2.uploader.upload(imagefile.path);
  return { imgId: response.public_id, url: response.secure_url };
},


  deleteImage: async function(img) {
    await cloudinary.v2.uploader.destroy(img, {});
  }
};
