import { Request, Response } from "express";
import {
  createTodo,
  getAllTodos,
  getByIdTodo,
  updateTodo,
  deleteTodo,
} from "../services/todosServices";
import { Types } from "mongoose";

export const createTodoController = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const { userId } = req;

    res.status(201).json(
      await createTodo({
        title,
        description,
        userId: new Types.ObjectId(userId.toString()),
      })
    );
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const getTodosController = async (req: Request, res: Response) => {
  try {
    const { userId } = req;

    res.status(200).json(await getAllTodos(userId.toString()));
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
export const getTodoByIdController = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { userId } = req;

    res.status(200).json(await getByIdTodo(_id, userId.toString()));
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const updateTodoController = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { title, description, completed } = req.body;
    const { userId } = req;

    res.status(200).json(
      await updateTodo({
        _id: new Types.ObjectId(_id),
        userId: new Types.ObjectId(userId.toString()),
        title,
        description,
        completed,
      })
    );
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const deleteTodoController = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { userId } = req;

    res.status(200).json(await deleteTodo(_id, userId.toString()));
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
