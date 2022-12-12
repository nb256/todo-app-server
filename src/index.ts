import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import routes from "./routes";

dotenv.config();

const { SERVER_PORT = 8080 } = process.env;

const app = express();

app.use(express.json());

app.use(cors());

app.get("/health", (_, res) => {
  res.send("Hello World!");
});

app.use(routes);

if (process.env.NODE_ENV !== "test") {
  app.listen(SERVER_PORT, () => {
    console.log(`Server started on port ${SERVER_PORT}`);
  });
}

export { app };
