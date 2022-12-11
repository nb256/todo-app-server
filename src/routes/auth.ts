import express from "express";
import bcrypt from "bcrypt";

import createUser from "../database/createUser";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).send("Missing fields");

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!hashedPassword) return res.status(500).send("Error hashing password");

  const user = await createUser(email, hashedPassword, name);

  res.json(user);
});

export default router;
