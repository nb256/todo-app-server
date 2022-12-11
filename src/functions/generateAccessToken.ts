import jwt from "jsonwebtoken";

export default function generateAccessToken(payload: {
  id: number;
  name: string;
  email: string;
}) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
}
