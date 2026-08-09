import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validateRegisterUser } from "../validators/auth.validator.js";

const authRouter = Router();



authRouter.post("/login", login);

authRouter.post("/register", validateRegisterUser, register);

export default authRouter;