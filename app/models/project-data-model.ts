import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ProjectSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  projectName: {
    type: String,
    required: true
  },
  users: {
    type: Array<String>()
  }
});
