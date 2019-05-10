import { Request, Response } from "express";

import { UsersController } from "../controllers/users-controller";
import { ProjectsController } from "../controllers/projects-controller";
import { TasksController } from "../controllers/task-controller";
import { AuthenticationController } from "../controllers/authentication-controller";

export class Routes {
  public usersController: UsersController = new UsersController();
  public projectsController: ProjectsController = new ProjectsController();
  public tasksController: TasksController = new TasksController();
  public authenticationController: AuthenticationController = new AuthenticationController();

  public routes(app): void {
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
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "GET request successfulll"
        });
      })
      // POST endpoint
      .post((req: Request, res: Response) => {
        // Create new task
        res.status(200).send({
          message: "POST request successfulll"
        });
      });
    // Task
    app
      .route("/users")
      // GET endpoint
      .get((req: Request, res: Response) => {
        // Get all users
        res.status(200).send({
          message: "GET request successfulll"
        });
      })
      .delete((req: Request, res: Response) => {
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
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "GET request successfulll"
        });
      })
      // POST endpoint
      .post((req: Request, res: Response) => {
        // Create new project
        res.status(200).send({
          message: "POST request successfulll"
        });
      });
    // project
    app
      .route("/projects")
      // GET endpoint
      .get((req: Request, res: Response) => {
        // Get all projects
        res.status(200).send({
          message: "GET request successfulll"
        });
      })
      .delete((req: Request, res: Response) => {
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
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: "GET request successfulll"
        });
      })
      // POST endpoint
      .post((req: Request, res: Response) => {
        // Create new task
        res.status(200).send({
          message: "POST request successfulll"
        });
      });
    app
      .route("/task")
      // GET endpoint
      .get((req: Request, res: Response) => {
        // Get all task
        res.status(200).send({
          message: "GET request successfulll"
        });
      })
      .delete((req: Request, res: Response) => {
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
      .post((req: Request, res: Response) => {
        // Create new task
        res.status(200).send({
          message: "POST request successfulll"
        });
      });
  }
}
