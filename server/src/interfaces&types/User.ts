import { ObjectId } from "mongodb";

export default interface User {
  _id: ObjectId;
  username: string;
  password: string;
}

export type NewUser = Omit<User, "_id">;
export type Login = Omit<User, "_id">;
