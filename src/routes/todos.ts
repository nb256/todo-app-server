import express from "express";

import createTodo from "../database/createTodo";
import deleteTodo from "../database/deleteTodo";
import markTodoCompleted from "../database/markTodoCompleted";
import markTodoUncompleted from "../database/markTodoUncompleted";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const createdTodo = await createTodo(title);

  res.json(createdTodo);
});

router.post("/markTodoCompleted", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  const updatedTodo = await markTodoCompleted(parseInt(id));

  res.json(updatedTodo);
});

router.post("/markTodoUncompleted", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  const updatedTodo = await markTodoUncompleted(parseInt(id));

  res.json(updatedTodo);
});

router.post("/delete", async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Id is required" });
  }

  const deletedTodo = await deleteTodo(parseInt(id));

  res.json(deletedTodo);
});

export default router;
