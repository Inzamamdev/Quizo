import express from "express";
import { quizSchema } from "../validation/validationSchema";
import { validate } from "../middleware/validationMiddleware";
import { createQuiz } from "../controller/quizController";
import { getQuizzes } from "../controller/quizController";
import { getQuizById } from "../controller/quizController";
import { updateQuiz } from "../controller/quizController";
import { deleteQuiz } from "../controller/quizController";
const router = express.Router();

router.post("/quizzes", validate(quizSchema), createQuiz);
router.get("/quizzes", getQuizzes);
router.get("/quizzes/:id", getQuizById);
router.put("/quizzes/:id", validate(quizSchema), updateQuiz);
router.delete("/quizzes/:id", deleteQuiz);
export default router;
