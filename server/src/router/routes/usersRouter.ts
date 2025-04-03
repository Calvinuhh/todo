import { Router } from "express";
import {
  RegisterController,
  loginController,
  getUserByIdController,
} from "../../controllers/usersController";
import { validateNewUser } from "../../middlewares/inputValidations";

const usersRouter: Router = Router();

usersRouter.post("/register", validateNewUser, RegisterController);
usersRouter.post("/login", loginController);
usersRouter.get("/:_id", getUserByIdController);

export default usersRouter;

