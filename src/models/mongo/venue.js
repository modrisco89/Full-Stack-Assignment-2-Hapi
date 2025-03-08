import Mongoose from "mongoose";

const { Schema } = Mongoose;

const venueSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Venue = Mongoose.model("venue", venueSchema);
