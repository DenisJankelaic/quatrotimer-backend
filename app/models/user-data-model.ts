import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});
