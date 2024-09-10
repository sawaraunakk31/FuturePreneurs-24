import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    regNo: {
      type: String,
    },
    mobNo: {
      type: Number,
    },
    hasFilledDetails:{
        type:Boolean,
    }
  },
  { collection: "Users" }
);

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);