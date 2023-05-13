import { Sequelize } from "sequelize";

export const db = new Sequelize("BudgetDB", "postgres", "budget123", {
  host: "localhost",
  dialect: "postgres",
  //   logging: false,
});
