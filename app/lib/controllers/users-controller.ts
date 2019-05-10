import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

import { UserSchema } from "../models/user-data-model";
import { UpdateUser } from "../shared/contracts";
import { TaskSchema } from "../models/task-data-model";
import { ProjectSchema } from "../models/project-data-model";

const User = mongoose.model("users", UserSchema);
const Task = mongoose.model("tasks", TaskSchema);
const Project = mongoose.model("projects", ProjectSchema);

export class UsersController {
  public getUsers(req: Request, res: Response): void {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }

  public getUserById(req: Request, res: Response): void {
    User.find({ _id: req.params.userId }, (err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }

  public async addNewUser(req: Request, res: Response): Promise<void> {
    const bodyParams = new User(req.body);
    const hashedPassword = await bcrypt.hash(bodyParams.password, 10);
    bodyParams.password = hashedPassword;
    bodyParams.save((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  }

  public deleteUser(req: Request, res: Response): void {
    User.remove({ _id: req.params.userId }, (err, user) => {
      if (err) {
        res.status(404).send(err);
      } else {
        Task.remove({ userId: req.params.userId }, (err, task) => {
          if (err) {
            res.send(err);
          } else {
            res.status(200).json({ message: "Task deleted" });
          }
        });
      }
    });
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { _id, login, password, role, userName }: UpdateUser = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    User.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          login: login,
          role: role,
          password: hashedPassword,
          userName: userName
        }
      },
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err);
        } else {
          res.json(user);
        }
      }
    );
  }
}
