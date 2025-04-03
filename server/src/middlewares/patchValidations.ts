import { Request, Response, NextFunction } from "express";

export const patchTodoValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, completed } = req.body;

    for (const key in req.body) {
      if (!req.body[key]) throw new Error(`${key} is required`);
    }

    if (title) {
      if (title.length < 1)
        throw Error("Title must be at least 1 character long");
      if (title.length > 100)
        throw Error("Title must be at most 100 characters long");
    }

    if (description) {
      if (description.length < 1)
        throw Error("Description must be at least 1 character long");
      if (description.length > 500)
        throw Error("Description must be at most 500 characters long");
    }

    if (completed) {
      if (typeof completed !== "boolean")
        throw Error("Completed must be a boolean");
    }

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
