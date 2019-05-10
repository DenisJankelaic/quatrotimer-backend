"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_controller_1 = require("../controllers/users-controller");
var projects_controller_1 = require("../controllers/projects-controller");
var task_controller_1 = require("../controllers/task-controller");
var authentication_controller_1 = require("../controllers/authentication-controller");
var Routes = /** @class */ (function () {
    function Routes() {
        this.usersController = new users_controller_1.UsersController();
        this.projectsController = new projects_controller_1.ProjectsController();
        this.tasksController = new task_controller_1.TasksController();
        this.authenticationController = new authentication_controller_1.AuthenticationController();
    }
    Routes.prototype.routes = function (app) {
        //USERS
        app.route("/users").get(this.usersController.getUsers);
        app.route("/user").post(this.usersController.addNewUser);
        app.route("/user/update").put(this.usersController.updateUser);
        app
            .route("/user/:userId")
            .delete(this.usersController.deleteUser)
            .get(this.usersController.getUserById);
        app
            .route("/")
            .get(function (req, res) {
            res.status(200).send({
                message: "GET request successfulll"
            });
        })
            // POST endpoint
            .post(function (req, res) {
            // Create new task
            res.status(200).send({
                message: "POST request successfulll"
            });
        });
        // Task
        app
            .route("/users")
            // GET endpoint
            .get(function (req, res) {
            // Get all users
            res.status(200).send({
                message: "GET request successfulll"
            });
        })
            .delete(function (req, res) {
            // Delete a user
            res.status(200).send({
                message: "DELETE request successfulll"
            });
        });
        //PROJECTS
        app.route("/projects").get(this.projectsController.getProjects);
        app.route("/project").post(this.projectsController.addNewProject);
        app
            .route("/project/:projectId")
            .delete(this.projectsController.deleteProject)
            .get(this.projectsController.getProjectById);
        app.route("/project/update").put(this.projectsController.updateProject);
        app
            .route("/")
            .get(function (req, res) {
            res.status(200).send({
                message: "GET request successfulll"
            });
        })
            // POST endpoint
            .post(function (req, res) {
            // Create new project
            res.status(200).send({
                message: "POST request successfulll"
            });
        });
        // project
        app
            .route("/projects")
            // GET endpoint
            .get(function (req, res) {
            // Get all projects
            res.status(200).send({
                message: "GET request successfulll"
            });
        })
            .delete(function (req, res) {
            // Delete a PROJECT
            res.status(200).send({
                message: "DELETE request successfulll"
            });
        });
        //TASKS
        app.route("/task").post(this.tasksController.addNewTask);
        app.route("/tasks/updateAll").put(this.tasksController.updateAllTasks);
        app.route("/tasks/:userId").get(this.tasksController.getTasks);
        app.route("/task/update").put(this.tasksController.updateTask);
        app.route("/task/delete/:taskId").delete(this.tasksController.deleteTask);
        app
            .route("/")
            .get(function (req, res) {
            res.status(200).send({
                message: "GET request successfulll"
            });
        })
            // POST endpoint
            .post(function (req, res) {
            // Create new task
            res.status(200).send({
                message: "POST request successfulll"
            });
        });
        app
            .route("/task")
            // GET endpoint
            .get(function (req, res) {
            // Get all task
            res.status(200).send({
                message: "GET request successfulll"
            });
        })
            .delete(function (req, res) {
            // Delete a task
            res.status(200).send({
                message: "DELETE request successfulll"
            });
        });
        //Authentication
        app.route("/login").post(this.authenticationController.loggingIn);
        app
            .route("/login")
            // POST endpoint
            .post(function (req, res) {
            // Create new task
            res.status(200).send({
                message: "POST request successfulll"
            });
        });
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map