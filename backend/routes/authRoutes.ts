import express from "express";
import { loginSchema } from "../validation/validationSchema";
import { validate } from "../middleware/validationMiddleware";
import { loginController } from "../controller/authController";

const router = express.Router();

router.post("/login", validate(loginSchema), loginController);

export default router;
