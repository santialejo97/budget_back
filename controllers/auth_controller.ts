import { Response, Request } from "express";
import { User } from "../models/users.model";
import { createJwt } from "../middlewares/create_jwt";
import * as bcrypt from "bcrypt";

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRegister = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!userRegister) {
      return res.status(422).json({
        ok: false,
        msg: `User with the email ${email} not found, please validate information`,
      });
    }

    // Validate password of user
    const validPassword: boolean = bcrypt.compareSync(
      password,
      userRegister.dataValues.password
    );

    if (!validPassword) {
      return res.status(422).json({
        ok: false,
        msg: `email and password is incorrect`,
      });
    }

    // Create token
    const token: string = createJwt(
      userRegister.dataValues.email,
      userRegister.dataValues.id
    );

    // delete password of the user to show
    delete userRegister.dataValues.password;
    return res.json({
      ok: true,
      user: userRegister,
      token,
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
    // Validate info User register
    const userRegister = await User.findOne({ where: { email: body.email } });

    if (userRegister) {
      return res.status(422).json({
        ok: false,
        msg: `User with the email ${body.email} it was found in the database, please validate information`,
      });
    }

    // encrypted password
    const passwordEncrypted: string = bcrypt.hashSync(
      body.password,
      bcrypt.genSaltSync(10)
    );

    body.password = passwordEncrypted;

    // Create User
    const newUser = await User.create(body);
    newUser.save();

    // Create token
    const { id, email } = newUser.dataValues;
    const token: string = createJwt(email, id);

    // delete password of the user to show
    delete newUser.dataValues.password;
    return res.json({
      ok: true,
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal Server Error",
    });
  }
};
