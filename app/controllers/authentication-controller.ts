import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";
import { Request, Response } from "express";

import { UserSchema } from "../models/user-data-model";
import {
  LoginDto,
  TokenData,
  UpdateUser,
  DataStoredInToken,
} from "../shared/contracts";

const User = mongoose.model("users", UserSchema);

export class AuthenticationController {
  public loggingIn = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const logInData: LoginDto = request.body;

    const user = await User.findOne({ login: logInData.login });

    console.log(user);

    if (user) {
      const isPasswordMatching = await bcrypt.compare(
        logInData.password,
        user.password
      );
      if (isPasswordMatching) {
        const tokenData = this.createToken(user);
        response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
        response.status(200).json(tokenData);
      } else {
        response.status(404).json({ message: "Wrong password" });
      }
    } else {
      response.status(404).json({ message: "User not found" });
    }
  };

  private createToken(user: UpdateUser): TokenData {
    const expiresIn = 60 * 120; // an hour
    // let secret;
    // if (process.env.SECRET != null) {
    //   secret = process.env.SECRET;
    // }
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, "0123456789", { expiresIn }),
      userId: user._id,
    };
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}
