import { model, Schema } from "mongoose";
import Todo from "../interfaces&types/Todo";

const todoSchema = new Schema<Todo>(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
      minLength: 1,
    },
    description: {
      type: String,
      maxLength: 500,
      minLength: 1,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model<Todo>("todo", todoSchema);
