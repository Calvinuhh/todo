import { Request, Response, NextFunction } from "express";

export const validateNewUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    if (!username) throw Error("Username is required");
    if (username.length < 3)
      throw Error("Username must be at least 3 characters long");
    if (username.length > 40)
      throw Error("Username must be at most 40 characters long");
    if (!/^[a-zA-Z0-9ñÑ!@#$%^&*()_+=[\]{}|;:'",.<>/?`~\\-]+$/.test(username))
      throw Error(
        "Username must contain only letters, numbers, and special characters, no spaces"
      );
    if (!password) throw Error("Password is required");
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    )
      throw Error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};

export const validateNewTodo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description } = req.body;

    if (!title) throw Error("Title is required");
    if (title.length < 1)
      throw Error("Title must be at least 1 character long");
    if (title.length > 100)
      throw Error("Title must be at most 100 characters long");
    if (description && description.length < 1)
      throw Error("Description must be at least 1 character long");
    if (description && description.length > 500)
      throw Error("Description must be at most 500 characters long");

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
