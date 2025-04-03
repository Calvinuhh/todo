import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";
import { verify } from "jsonwebtoken";
import { getUserById } from "../services/usersServices";

declare global {
  namespace Express {
    interface Request {
      userId: ObjectId;
    }
  }
}

process.loadEnvFile();
const { JWT_SECRET } = process.env;

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw Error("Authorization header is missing");

    const token = authorization.split(" ")[1];

    const decode = verify(token, JWT_SECRET as string);

    if (typeof decode === "object") {
      await getUserById(decode.id);
      req.userId = decode.id;
    }

    next();
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
