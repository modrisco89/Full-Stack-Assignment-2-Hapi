import Mongoose from "mongoose";

const { Schema } = Mongoose;

const venueSchema = new Schema({
  title: String,
  description: String,
  latitude: Number,
  longitude: Number,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Venue = Mongoose.model("venue", venueSchema);
