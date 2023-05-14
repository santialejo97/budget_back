import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../models/users.model";

export const validatorJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token: string = "";
    if (req.headers.authorization) {
      token = req.headers.authorization;
    }

    const payload = verify(
      token,
      process.env.JWTKEYSECRET || "budgetSecret1234355676745737632"
    ) as { [key: string]: any };

    const { uuid } = payload;

    const user = await User.findByPk(uuid);
    if (!user) {
      return res.status(422).json({
        ok: false,
        msg: "Token Incorrect",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error, Validate token",
    });
  }
};
