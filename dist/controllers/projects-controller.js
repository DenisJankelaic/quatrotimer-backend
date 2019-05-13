"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var project_data_model_1 = require("../models/project-data-model");
var task_data_model_1 = require("../models/task-data-model");
var Project = mongoose.model("projects", project_data_model_1.ProjectSchema);
var Task = mongoose.model("tasks", task_data_model_1.TaskSchema);
var ProjectsController = /** @class */ (function () {
    function ProjectsController() {
    }
    ProjectsController.prototype.getProjects = function (req, res) {
        Project.find({}, function (err, project) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(project);
            }
        });
    };
    ProjectsController.prototype.getProjectById = function (req, res) {
        Project.find({ _id: req.params.projectId }, function (err, project) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(project);
            }
        });
    };
    ProjectsController.prototype.addNewProject = function (req, res) {
        console.log(req.body);
        var newProject = new Project(req.body);
        newProject.save(function (err, project) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(project);
            }
        });
    };
    ProjectsController.prototype.deleteProject = function (req, res) {
        Project.remove({ _id: req.params.projectId }, function (err, project) {
            if (err) {
                res.send(err);
            }
            else {
                Task.remove({ projectId: req.params.projectId }, function (err, task) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        res.status(200).json({ message: "Task deleted" });
                    }
                });
            }
        });
    };
    ProjectsController.prototype.updateProject = function (req, res) {
        var newlyUpdatedProject = req.body;
        Project.findOneAndUpdate({ _id: newlyUpdatedProject._id }, {
            $set: {
                projectName: newlyUpdatedProject.projectName,
                users: newlyUpdatedProject.users
            }
        }, { new: true }, function (err, project) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(project);
            }
        });
    };
    return ProjectsController;
}());
exports.ProjectsController = ProjectsController;
//# sourceMappingURL=projects-controller.js.map