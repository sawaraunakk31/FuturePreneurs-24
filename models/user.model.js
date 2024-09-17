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
    },
    consent:{
      type:Boolean,
    },
    teamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TeamModel'
    },
    teamLeaderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TeamModel'
    },
    teamRole:{
      type: Number,
    }
  },
  { collection: "Users" }
);

export const Users =
  mongoose.models.Users || mongoose.model("Users", userSchema);