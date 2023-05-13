import { Response, Request } from "express";
import { User } from "../models/users.model";
import { where } from "sequelize";

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRegister = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userRegister) {
      return res.status(404).json({
        ok: false,
        msg: `User with the email ${email} not found, please validate information`,
      });
    }
    return res.json({
      ok: true,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
    });
  }
};

export const authRegister = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const newUser = await User.create(req.body);
    newUser.save();

    return res.json({
      ok: true,
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
    });
  }
};
