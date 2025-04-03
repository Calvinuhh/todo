import { Router } from "express";
import {
  createTodoController,
  getTodosController,
  getTodoByIdController,
  updateTodoController,
  deleteTodoController,
} from "../../controllers/todoController";

import { validateObjetcId } from "../../middlewares/validateObjetcId";
import { authorization } from "../../middlewares/authorization";
import { validateNewTodo } from "../../middlewares/inputValidations";
import { patchTodoValidation } from "../../middlewares/patchValidations";

const todoRouter: Router = Router();

todoRouter.use(authorization);
todoRouter.param("_id", validateObjetcId);

todoRouter.post("/", validateNewTodo, createTodoController);
todoRouter.get("/", getTodosController);
todoRouter.get("/:_id", getTodoByIdController);
todoRouter.patch("/:_id", patchTodoValidation, updateTodoController);
todoRouter.delete("/:_id", deleteTodoController);

export default todoRouter;
