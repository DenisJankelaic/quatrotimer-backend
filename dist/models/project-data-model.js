"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.ProjectSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    },
    users: {
        type: Array()
    }
});
//# sourceMappingURL=project-data-model.js.map