"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.TaskSchema = new Schema({
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
        type: Array(),
        required: true
    }
});
//# sourceMappingURL=task-data-model.js.map