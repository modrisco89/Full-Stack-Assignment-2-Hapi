import Mongoose from "mongoose";

const { Schema } = Mongoose;

const adminSchema = new Schema({
  firstName: String,
  email: String,
  lastName: String,
  date: String,
  action: String,
});

export const Admin = Mongoose.model("Admin", adminSchema);
