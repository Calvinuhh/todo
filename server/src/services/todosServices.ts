import Todo from "../models/Todo";
import { CreateTodo, UpdateTodo } from "../interfaces&types/Todo";

export const createTodo = async (data: CreateTodo) => {
  const { title, description, userId } = data;

  const newTodo = await Todo.create({
    title,
    description,
    userId,
  });

  return newTodo;
};

export const getAllTodos = async (userId: string) => {
  const todos = await Todo.find({ userId });

  if (todos.length === 0) throw Error("No todos found");

  return todos;
};

export const getByIdTodo = async (_id: string, userId: string) => {
  const todo = await Todo.findOne({ _id, userId });

  if (!todo) throw Error("Todo not found");

  return todo;
};

export const updateTodo = async (data: UpdateTodo) => {
  const { _id, userId, completed, description, title } = data;

  const todo = await Todo.findOne({ _id, userId });

  if (!todo) throw Error("Todo not found");

  type TodoUpdateObject = Omit<UpdateTodo, "_id" | "userId">;

  const updateObject: TodoUpdateObject = {};

  if (title) updateObject.title = title;
  if (description) updateObject.description = description;
  if (completed) updateObject.completed = completed;

  todo.set(updateObject);

  await todo.save();

  return todo;
};

export const deleteTodo = async (_id: string, userId: string) => {
  const todo = await Todo.findOne({ _id, userId });

  if (!todo) throw Error("Todo not found");

  await todo.deleteOne();

  return "Todo deleted successfully";
};
