import Mongoose from "mongoose";

const { Schema } = Mongoose;

const infoSchema = new Schema({
  title: String,
  artist: Number,
  duration: String,
  genre: String,
  venueid: {
    type: Schema.Types.ObjectId,
    ref: "venue",
  },
});

export const Info = Mongoose.model("info", infoSchema);
