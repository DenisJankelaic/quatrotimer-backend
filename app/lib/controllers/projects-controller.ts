import * as mongoose from "mongoose";
import { Request, Response } from "express";
import { ProjectSchema } from "../models/project-data-model";
import { UpdateProject } from "../shared/contracts";
import { TaskSchema } from "../models/task-data-model";

const Project = mongoose.model("projects", ProjectSchema);
const Task = mongoose.model("tasks", TaskSchema);

export class ProjectsController {
  public getProjects(req: Request, res: Response): void {
    Project.find({}, (err, project) => {
      if (err) {
        res.send(err);
      } else {
        res.json(project);
      }
    });
  }

  public getProjectById(req: Request, res: Response): void {
    Project.find({ _id: req.params.projectId }, (err, project) => {
      if (err) {
        res.send(err);
      } else {
        res.json(project);
      }
    });
  }

  public addNewProject(req: Request, res: Response): void {
    console.log(req.body);
    const newProject = new Project(req.body);

    newProject.save((err, project) => {
      if (err) {
        res.send(err);
      } else {
        res.json(project);
      }
    });
  }

  public deleteProject(req: Request, res: Response): void {
    Project.remove({ _id: req.params.projectId }, (err, project) => {
      if (err) {
        res.send(err);
      } else {
        Task.remove({ projectId: req.params.projectId }, (err, task) => {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json({ message: "Task deleted" });
          }
        });
      }
    });
  }

  public updateProject(req: Request, res: Response): void {
    const newlyUpdatedProject: UpdateProject = req.body;
    console.log("im here lol");
    Project.findOneAndUpdate(
      { _id: newlyUpdatedProject._id },
      {
        $set: {
          projectName: newlyUpdatedProject.projectName,
          users: newlyUpdatedProject.users
        }
      },
      { new: true },
      (err, project) => {
        if (err) {
          res.send(err);
        } else {
          res.json(project);
        }
      }
    );
  }
}
