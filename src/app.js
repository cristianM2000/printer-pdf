import express from "express";
import printController from "./controllers/printController.js";
import { ERR_BAD_REQUEST, ERR_NOT_FOUND } from "./utils/validationUtils.js";
import fileUpload from 'express-fileupload';

const app = express();
const port = 3000;

app.use(express.json());


app.use(fileUpload({
  createParentPath: true
}));

app.use("/", printController);

app.use((err, req, res, next) => {
  if (err.code === ERR_BAD_REQUEST) {
    res.status(400).send(`${err}`);
  } else if (err.code === ERR_NOT_FOUND) {
    res.status(404).send("Error: None printer was found.");
  } else {
    res.status(500).send("Error interno del servidor.");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
