import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  _id: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String
  },
  taskName: {
    type: String
  },
  projectId: {
    type: String,
    required: true
  },
  taskStatus: {
    type: String,
    required: true
  },
  isCurrent: {
    type: Boolean
  },
  startStopHistory: {
    type: Array<String>(),
    required: true
  }
});
