import { Router } from "express";
import { authLogin, authRegister } from "../controllers/auth_controller";
export const router = Router();

router.post("/login", authLogin);
router.post("/register", authRegister);
