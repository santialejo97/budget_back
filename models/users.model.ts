import { Sequelize, DataTypes } from "sequelize";
import { db } from "../db/connection";

export const User = db.define("tbl_users", {
  nameuser: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  isactive: {
    type: DataTypes.BOOLEAN,
  },
  role: {
    type: DataTypes.STRING,
  },
});
