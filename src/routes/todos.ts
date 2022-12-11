import express from "express";

import createTodo from "../database/createTodo";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const createdTodo = await createTodo(title);

  res.json(createdTodo);
});

export default router;
