import { Request, Response } from "express";
import { createUser, getUserById, login } from "../services/usersServices";

export const RegisterController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    res.status(200).json(await createUser({ username, password }));
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    res.status(200).json(await login({ username, password }));
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    res.status(200).json(await getUserById(_id));
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
