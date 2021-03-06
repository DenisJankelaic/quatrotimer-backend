import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";

import { UserSchema } from "../models/user-data-model";
import { UpdateUser, UpdateUserInfo } from "../shared/contracts";
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

    const user = await User.findOne({ login: bodyParams.login });

    if (user != null) {
      res.status(400).send("User with this login already exists.");
    } else {
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
            res.status(200).json({ message: "User deleted" });
          }
        });
      }
    });
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const { _id, login, password, role, userName }: UpdateUser = req.body;
    let userInfoToUpdate: UpdateUserInfo = {
      login: login,
      role: role,
      userName: userName,
    };

    const user = await User.findOne({ login: userInfoToUpdate.login });

    if (user != null && user._id !== _id) {
      res.status(400).send("User with this login already exists.");
    } else {
      if (password !== "") {
        const hashedPassword = await bcrypt.hash(password, 10);
        userInfoToUpdate = {
          login: login,
          role: role,
          userName: userName,
          password: hashedPassword,
        };
      }

      User.findOneAndUpdate(
        { _id: _id },
        {
          $set: { ...userInfoToUpdate },
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
}
