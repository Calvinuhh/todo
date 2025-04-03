import express, { json } from "express";
import router from "./router/router";
import cors from "cors";

const app = express();

process.loadEnvFile();
const { CLIENT_URL } = process.env;

app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(json());

app.use(router);

export default app;
