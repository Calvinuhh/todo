import { connect } from "mongoose";

const { DB_URI } = process.env as { DB_URI: string };

export default async function DBConnect() {
  try {
    await connect(DB_URI);
    console.log("Conexion exitosa con la base de datos");
  } catch (error) {
    const err = error as Error;
    console.error("Error en la conexion con la base de datos");
    throw Error(err.message);
  }
}
