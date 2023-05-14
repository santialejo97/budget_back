import { Router } from "express";
import { authLogin, authRegister } from "../controllers/auth_controller";
import { validatorJwt } from "../middlewares/index";
export const router = Router();

router.post("/login", validatorJwt, authLogin);
router.post("/register", authRegister);
