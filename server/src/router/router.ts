import { Router } from "express";
import todoRouter from "./routes/todoRouter";
import usersRouter from "./routes/usersRouter";
import limiter from "../config/limiter";

const router: Router = Router();

router.use(limiter);

router.use("/auth", usersRouter);
router.use("/todos", todoRouter);

export default router;
