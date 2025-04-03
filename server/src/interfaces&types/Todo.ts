import { ObjectId } from "mongodb";

export default interface Todo {
  _id: ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  userId: ObjectId;
}

export type CreateTodo = Omit<Todo, "_id" | "completed">;

export interface UpdateTodo extends Omit<Todo, "completed" | "title"> {
  title?: string;
  completed?: boolean;
}
