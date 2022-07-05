import express from "express";
import pkg from "body-parser";
import morgan from "morgan";
import cors from "cors";
import config from "./config/index.js";
import router from "./routers/router.js";
import AppLevelMiddleware from "./middlewares/AppLevelMiddleware.js";

const { urlencoded } = pkg;

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", router);

app.use(AppLevelMiddleware.page404);
app.use(AppLevelMiddleware.handleErrors);

const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on  http://localhost:${config.port}/api/books`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();