import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { TaskSchema } from "../models/task-data-model";
import { UpdateTask, UpdateTaskList } from "../shared/contracts";

const Task = mongoose.model("tasks", TaskSchema);

export class TasksController {
  public getTasks(req: Request, res: Response): void {
    Task.find({ userId: req.params.userId }, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }

  public addNewTask(req: Request, res: Response): void {
    const newTask = new Task(req.body);
    newTask.save((err, task) => {
      if (err) {
        res.send(err);
      } else {
        res.json(task);
      }
    });
  }

  public updateTask(req: Request, res: Response): void {
    const {
      _id,
      description,
      endDate,
      isCurrent,
      project,
      startDate,
      startStopHistory,
      taskName,
      taskStatus,
      userId
    }: UpdateTask = req.body;
    Task.findOneAndUpdate(
      { _id: _id },
      {
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
      },
      { new: true },
      (err, task) => {
        if (err) {
          res.send(err);
        } else {
          res.json(task);
        }
      }
    );
  }

  public deleteTask(req: Request, res: Response): void {
    Task.remove({ _id: req.params.taskId }, (err, task) => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Successfully deleted Task!" });
      }
    });
  }

  public async updateAllTasks(req: Request, res: Response): Promise<void> {
    const { userId, taskId }: UpdateTaskList = req.query;
    console.log(userId, taskId);

    Task.find(
      { userId: userId},
      {
        $set: {
          isCurrent: false
        }
      },
      (err, task) => {
        if (err) {
          res.send(err);
        } else {
          res.json(task);
        }
      }
    );
  }
}
