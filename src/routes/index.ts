import { Router } from "express";

import todosRouter from "./todos";
import authRouter from "./auth";

const routes = Router();

routes.use("/todos", todosRouter);
routes.use("/auth", authRouter);

export default routes;
