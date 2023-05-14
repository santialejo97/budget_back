import { sign } from "jsonwebtoken";

export const createJwt = (email: string, id: string) => {
  const payload: { email: string; uuid: string } = {
    email,
    uuid: id,
  };

  const token: string = sign(
    payload,
    process.env.JWTKEYSECRET || "budgetSecret1234355676745737632",
    { expiresIn: "2h" }
  );

  return token;
};
