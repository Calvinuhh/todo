import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

export const validateObjetcId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.params;

    if (!Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid Object ID" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid request parameters" });
  }
};
