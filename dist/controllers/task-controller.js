"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var task_data_model_1 = require("../models/task-data-model");
var Task = mongoose.model("tasks", task_data_model_1.TaskSchema);
var TasksController = /** @class */ (function () {
    function TasksController() {
    }
    TasksController.prototype.getTasks = function (req, res) {
        Task.find({ userId: req.params.userId }, function (err, user) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(user);
            }
        });
    };
    TasksController.prototype.addNewTask = function (req, res) {
        var newTask = new Task(req.body);
        newTask.save(function (err, task) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(task);
            }
        });
    };
    TasksController.prototype.updateTask = function (req, res) {
        var _a = req.body, _id = _a._id, description = _a.description, endDate = _a.endDate, isCurrent = _a.isCurrent, project = _a.project, startDate = _a.startDate, startStopHistory = _a.startStopHistory, taskName = _a.taskName, taskStatus = _a.taskStatus, userId = _a.userId;
        Task.findOneAndUpdate({ _id: _id }, {
            $set: {
                description: description,
                endDate: endDate,
                isCurrent: isCurrent,
                project: project,
                startDate: startDate,
                startStopHistory: startStopHistory,
                taskName: taskName,
                taskStatus: taskStatus,
                userId: userId
            }
        }, { new: true }, function (err, task) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(task);
            }
        });
    };
    TasksController.prototype.deleteTask = function (req, res) {
        Task.remove({ _id: req.params.taskId }, function (err, task) {
            if (err) {
                res.send(err);
            }
            else {
                res.json({ message: "Successfully deleted Task!" });
            }
        });
    };
    TasksController.prototype.updateAllTasks = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, taskId;
            return __generator(this, function (_b) {
                _a = req.query, userId = _a.userId, taskId = _a.taskId;
                console.log(userId, taskId);
                Task.updateMany({ userId: userId, taskId: { $ne: taskId } }, {
                    $set: {
                        isCurrent: false
                    }
                }, function (err, task) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.json(task);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    TasksController.prototype.updateNewCurrent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, taskId;
            return __generator(this, function (_b) {
                _a = req.query, userId = _a.userId, taskId = _a.taskId;
                console.log("update new current", userId, taskId);
                Task.findOneAndUpdate({ userId: userId, taskId: taskId }, {
                    $set: {
                        isCurrent: true
                    }
                }, function (err, task) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.status(200).json(task);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    return TasksController;
}());
exports.TasksController = TasksController;
//# sourceMappingURL=task-controller.js.map