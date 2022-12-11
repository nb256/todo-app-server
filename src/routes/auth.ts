import express from "express";
import bcrypt from "bcrypt";

import createUser from "../database/createUser";
import getUserByEmail from "../database/getUserByEmail";
import generateAccessToken from "../functions/generateAccessToken";

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name)
    return res.status(400).send("Missing fields");

  const userExists = await getUserByEmail(email);

  if (userExists) return res.status(409).send("User already exists");

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!hashedPassword) return res.status(500).send("Error hashing password");

  const user = await createUser(email, hashedPassword, name);

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send("Missing fields");

  const user = await getUserByEmail(email);

  if (!user) return res.status(404).send("User not found");

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) return res.status(401).send("Wrong password");

  const jwtToken = generateAccessToken({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  res.json({ user, jwtToken });
});

export default router;
