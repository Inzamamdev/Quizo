import express from "express";
import { quizSchema } from "../validation/validationSchema";
import { validate } from "../middleware/validationMiddleware";
import { createQuiz } from "../controller/quizController";
import { getQuizzes } from "../controller/quizController";
const router = express.Router();

router.post("/quizzes", validate(quizSchema), createQuiz);
router.get("/quizzes", getQuizzes);
export default router;
