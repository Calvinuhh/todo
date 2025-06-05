import app from "./app";
import DBConnect from "./config/database";

const { PORT } = process.env;

DBConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
