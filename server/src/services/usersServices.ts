import User from "../models/User";
import { NewUser, Login } from "../interfaces&types/User";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

process.loadEnvFile();
const { JWT_SECRET } = process.env as { JWT_SECRET: string };

export const createUser = async (data: NewUser) => {
  const { password, username } = data;

  const user = await User.findOne({ username });

  if (user) throw new Error("User already exists");

  await User.create({ username, password: await hash(password, 8) });

  return "User created";
};

export const login = async (data: Login) => {
  const { password, username } = data;

  const user = await User.findOne({ username });

  if (!user) throw new Error("Unregistered user");

  const checkPassword = await compare(password, user.password);

  if (!checkPassword) throw new Error("Invalid password");

  return sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "60m",
  });
};

export const getUserById = async (_id: string) => {
  const user = await User.findById(_id).select("-password");

  if (!user) throw new Error("User not found");

  return user;
};
